package capstone.allbom.chatbot.service;

import capstone.allbom.chatbot.domain.Qna;
import capstone.allbom.chatbot.domain.QnaRepository;
import capstone.allbom.chatbot.dto.QnaPair;
import capstone.allbom.chatbot.dto.QnaResponse;
import capstone.allbom.common.exception.BadRequestException;
import capstone.allbom.common.exception.DefaultErrorCode;
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
    
    @Value("https://allbom.s3.ap-northeast-2.amazonaws.com/chat_male.jpg")
    private String CHAT_MALE_IMAGE_URL;

    @Transactional
    public QnaResponse getFifteenQnasByPagination(final Member member, Pageable pageable) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        if (savedMember.getChatProfileImageUrl() == null) {
            throw new BadRequestException(DefaultErrorCode.NEED_CHATBOT_PROFILE_UPDATE);
        }

        List<Qna> qnas = qnaRepository.findAllOrderByCreatedAtPagination(savedMember.getId(), pageable);
        List<QnaPair> qnaPairs = qnas.stream()
                .map(QnaPair::from)
                .toList();

        return QnaResponse.from(member, qnaPairs);

    }

    @Transactional
    public List<Qna> getTopFiveQnas(final Member member) {
        Member savedMember = memberRepository.findById(member.getId())
                .orElseThrow(() -> new BadRequestException(DefaultErrorCode.NOT_FOUND_MEMBER_ID));

        return qnaRepository.findAllOrderByCreatedAtDesc(savedMember.getId())
                .stream()
                .limit(5)
                .collect(Collectors.toList());
    }


}
