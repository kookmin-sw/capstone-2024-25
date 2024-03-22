package capstone.allbom.chatbot.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface QuestionRepository extends JpaRepository<Question, Long> {
    Question save(Question question);

    Optional<Question> findById(Long questionId);

    List<Question> findByMemberId(Long memberId);

    boolean existsById(Long id);

    List<Question> findAll();
}
