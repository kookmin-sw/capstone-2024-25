package capstone.allbom.chatbot.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    Qna save(Qna qna);

    Optional<Qna> findById(Long qnaId);

    List<Qna> findByChatbotId(Long chatbotId);

    List<Qna> findByTwentyQuestionsId(Long twentyQuestionsId);

    List<Qna> findAll();
}
