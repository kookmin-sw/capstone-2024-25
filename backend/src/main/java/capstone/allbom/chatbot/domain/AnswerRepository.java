package capstone.allbom.chatbot.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface AnswerRepository extends JpaRepository<Answer, Long> {
    Answer save(Answer answer);

    Optional<Answer> findById(Long answerId);

    List<Answer> findByChatbotId(Long chatbotId);

    List<Answer> findByQuestionId(Long questionId);

    boolean existsById(Long id);

    List<Answer> findAll();
}
