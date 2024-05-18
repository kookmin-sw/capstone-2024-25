package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.chatbot.domain.TwentyQuestions;
import capstone.allbom.chatbot.domain.TwentyQuestionsRepository;
import capstone.allbom.chatbot.dto.QnaPair;
import capstone.allbom.chatbot.dto.QuestionRequest;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerRequest;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyAnswerResponse;
import capstone.allbom.chatbot.dto.twentyQuestions.TwentyQnaResponse;
import capstone.allbom.chatbot.infrastructure.api.TwentyQuestionsRequester;
import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service
@Transactional
public class TwentyQuestionsService {

    private final QnaRepository qnaRepository;
    private final MemberRepository memberRepository;
    private final TwentyQuestionsRequester twentyQuestionsRequester;

    private final TwentyQuestionsRepository twentyQuestionsRepository;

    // 스무고개
    @Transactional
    public TwentyQnaResponse getAllTwentyQuestionsQnas(final Member member) { // 대화 내역 조회 -> 클라이언트
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        if (savedMember.getChatProfileImageUrl() == null) {
            throw new BadRequestException(DefaultErrorCode.NEED_CHATBOT_PROFILE_UPDATE);
        }

        List<Qna> qnas = qnaRepository.findAllTwentyQuestionsOrderByCreatedAtDesc(savedMember.getId());

        Optional<TwentyQuestions> optionalTwentyQuestions = twentyQuestionsRepository.findByMemberId(member.getId());

        String solution = "";
        int questionCount = 20;

        if (optionalTwentyQuestions.isPresent()) {
            TwentyQuestions twentyQuestions = optionalTwentyQuestions.get();
            solution = twentyQuestions.getSolution();
            questionCount = twentyQuestions.getQuestionCount();
        }

        List<QnaPair> qnaPairs = qnas.stream()
                .map(QnaPair::from)
                .toList();

        return TwentyQnaResponse.from(member, qnaPairs, solution, questionCount);
    }

    @Transactional
    public TwentyAnswerRequest convertGameRequestTypeForAI(final Member member, QuestionRequest questionRequest) { // -> AI
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

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

    @Transactional
    public TwentyAnswerResponse requestAnswer(final Member member, QuestionRequest questionRequest) {
        TwentyAnswerRequest twentyAnswerRequest = convertGameRequestTypeForAI(member, questionRequest);

        TwentyQuestions twentyQuestions = twentyQuestionsRepository.findByMemberId(member.getId())
                .orElseThrow(() -> new NotFoundException(DefaultErrorCode.NOT_FOUND_TWENTY_QUESTIONS));

        TwentyAnswerResponse twentyAnswerResponse = twentyQuestionsRequester.requestAI(twentyAnswerRequest);
        updateTwentyQuestions(twentyQuestions, twentyAnswerResponse);

        final Qna qna = Qna.from(member, questionRequest, twentyAnswerResponse, twentyQuestions);
        qnaRepository.save(qna);
        return twentyAnswerResponse;
    }
    @Transactional
    public void updateTwentyQuestions(TwentyQuestions twentyQuestions, TwentyAnswerResponse twentyAnswerResponse) {
        if (twentyAnswerResponse.questionCount() == 0 || twentyAnswerResponse.isCorrect()) {
            twentyQuestions.setQuestionCount(twentyAnswerResponse.questionCount());
            twentyQuestions.setIsComplete(true);
        } else if (twentyAnswerResponse.questionCount() == 20){
            twentyQuestions.setSolution(twentyAnswerResponse.solution());
        }
        else {
            twentyQuestions.setQuestionCount(twentyAnswerResponse.questionCount());
        }
    }
}
