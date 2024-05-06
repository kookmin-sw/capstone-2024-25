package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.Chatbot;
import capstone.allbom.chatbot.domain.ChatbotRepository;
import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
import capstone.allbom.common.exception.NotFoundException;
import capstone.allbom.game.domain.Game;
import capstone.allbom.game.domain.Subject;
import capstone.allbom.game.domain.SubjectType;
import capstone.allbom.member.domain.Member;
import capstone.allbom.member.domain.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
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
    private final ChatbotRepository chatbotRepository;
    private final MemberRepository memberRepository;
    
    @Value("https://allbom.s3.ap-northeast-2.amazonaws.com/chat_male.jpg")
    private String CHAT_MALE_IMAGE_URL;

    @Transactional
    public List<Qna> getFifteenQnasByPagination(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        return qnaRepository.findAllOrderByCreatedAtDesc(savedMember.getId())
                .stream()
                .limit(5)
                .collect(Collectors.toList());
    }

    @Transactional
    public List<Qna> getTopFiveQnas(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        return qnaRepository.findAllOrderByCreatedAtDesc(savedMember.getId());
    }

    public List<Qna> getChatbot(final Member member) {
        createChatbot(member);
        return qnaRepository.findAllOrderByCreatedAtDesc(member.getId());
    }

    @Transactional
    public Chatbot createChatbot(final Member member) {
        final Chatbot chatbot = chatbotRepository.save(new Chatbot());
        chatbot.setMember(member);
        chatbot.setProfileImageUrl(CHAT_MALE_IMAGE_URL);
        return chatbot;
    }
}
