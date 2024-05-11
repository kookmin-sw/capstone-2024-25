package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.chatbot.domain.TwentyQuestions;
import capstone.allbom.chatbot.domain.TwentyQuestionsRepository;
import capstone.allbom.chatbot.dto.*;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerRequest;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerResponse;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyQnaResponse;
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
import java.util.stream.Collectors;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class QnaService {

    private final QnaRepository qnaRepository;
    private final MemberRepository memberRepository;

    private final TwentyQuestionsRepository twentyQuestionsRepository;
    
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
    public List<QnaAndTypeResponse> getTopFiveQnas(final Member member) { // -> AI
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        List<Qna> qnas = qnaRepository.findAllOrderByCreatedAtDesc(savedMember.getId())
                .stream()
                .limit(5)
                .toList();

        return qnas.stream()
                .map(QnaAndTypeResponse::from)
                .toList();
    }

    @Transactional
    public AnswerRequest convertRequestTypeForAI(final Member member, QuestionRequest questionRequest) { // -> AI
        List<QnaAndTypeResponse> topFiveQnas = getTopFiveQnas(member);
        return AnswerRequest.from(member, questionRequest, topFiveQnas);
    }

    // 스무고개
    @Transactional
    public TwentyQnaResponse getAllTwentyQuestionsQnas(final Member member) { // 대화 내역 조회 -> 클라이언트
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        if (savedMember.getChatProfileImageUrl() == null) {
            throw new BadRequestException(DefaultErrorCode.NEED_CHATBOT_PROFILE_UPDATE);
        }

        List<Qna> qnas = qnaRepository.findAllTwentyQuestionsOrderByCreatedAtDesc(savedMember.getId());

        List<QnaPair> qnaPairs = qnas.stream()
                .map(QnaPair::from)
                .toList();

        return TwentyQnaResponse.from(member, qnaPairs);
    }

    @Transactional
    public TwentyAnswerRequest convertGameRequestTypeForAI(final Member member, QuestionRequest questionRequest) { // -> AI
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

//        List<Qna> qnas = qnaRepository.findAllTwentyQuestionsOrderByCreatedAtDesc(savedMember.getId());
//
//        if (qnas.size() == 0) {
//            TwentyQuestions twentyQuestions = createTwentyQuestions(member);
//        } else {
//            twentyQuestionsRepository.findByMemberId(member.getId());
//        }


        TwentyQuestions twentyQuestions = twentyQuestionsRepository.findByMemberId(member.getId())
                .orElseGet(() -> createTwentyQuestions(member, questionRequest));

        List<Qna> qnas = qnaRepository.findByTwentyQuestionsAndMember(member.getId(), twentyQuestions.getId());

        List<QnaPair> qnaPairs = qnas.stream()
                .map(QnaPair::from)
                .toList();

        return TwentyAnswerRequest.from(questionRequest, twentyQuestions, qnaPairs);
    }

    @Transactional
    public TwentyQuestions createTwentyQuestions(final Member member, QuestionRequest questionRequest) {
        if (questionRequest.question().length() > 0) {
            throw new BadRequestException(DefaultErrorCode.INVALID_TWENTY_QUESTIONS_REQUEST);
        }
        return twentyQuestionsRepository.save(new TwentyQuestions(member));
    }

//    @Transactional
//    public TwentyAnswerResponse requestAI(final Member member) {
//        TwentyQuestions twentyQuestions = twentyQuestionsRepository.findByMemberId(member.getId())
//                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_TWENTY_QUESTIONS));
//
//        // AI 요청
//
//        // 이후 twentyQuestions solution, questionCount 업데이트
//        if (twentyAnswerResponse.getQuestionCount() == 0 || twentyAnswerResponse.isCorrect == true) {
//            twentyQuestions.setIsComplete(true);
//        }
//    }

}
