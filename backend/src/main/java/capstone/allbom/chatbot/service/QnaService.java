package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.chatbot.domain.TwentyQuestionsRepository;
import capstone.allbom.chatbot.dto.*;
import capstone.allbom.chatbot.infrastructure.api.ChatbotRequester;
import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class QnaService {

    private final QnaRepository qnaRepository;
    private final MemberRepository memberRepository;

    private final ChatbotRequester chatbotRequester;
    
    @Value("https://allbom.s3.ap-northeast-2.amazonaws.com/chat_male.jpg")
    private String CHAT_MALE_IMAGE_URL;



    @Transactional
    public QnaResponse getFifteenQnasByPagination(final Member member, Pageable pageable) { // -> 클라이언트
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        if (savedMember.getChatProfileImageUrl() == null) {
            throw new BadRequestException(DefaultErrorCode.NEED_CHATBOT_PROFILE_UPDATE);
        }

        List<Qna> qnas = qnaRepository.findAllOrderByCreatedAtPagination(savedMember.getId(), pageable);
        List<QnaAndTypeResponse> qnaResponses = qnas.stream()
                .map(QnaAndTypeResponse::from)
                .toList();

        return QnaResponse.from(member, qnaResponses);
    }

    @Transactional
    public List<QnaAndTypeResponse> getTopThreeQnas(final Member member) { // -> AI
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        List<Qna> qnas = qnaRepository.findAllOrderByCreatedAtDesc(savedMember.getId())
                .stream()
                .limit(3)
                .toList();

        return qnas.stream()
                .map(QnaAndTypeResponse::from)
                .toList();
    }

    @Transactional
    public AnswerRequest convertRequestTypeForAI(final Member member, QuestionRequest questionRequest) { // -> AI
        List<QnaAndTypeResponse> topFiveQnas = getTopThreeQnas(member);
        return AnswerRequest.from(member, questionRequest, topFiveQnas);
    }

    @Transactional
    public AnswerResponse requestAnswer(final Member member, QuestionRequest questionRequest) {
        AnswerRequest answerRequest = convertRequestTypeForAI(member, questionRequest);
        AnswerResponse answerResponse = chatbotRequester.requestAI(answerRequest);
        final Qna qna = Qna.from(member, questionRequest, answerResponse);
        qnaRepository.save(qna);
        return answerResponse;
    }

}
