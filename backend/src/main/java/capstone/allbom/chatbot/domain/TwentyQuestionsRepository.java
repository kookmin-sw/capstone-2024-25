package capstone.allbom.chatbot.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TwentyQuestionsRepository extends JpaRepository<TwentyQuestions, Long> {
    TwentyQuestions save(TwentyQuestions twentyQuestions);

    Optional<TwentyQuestions> findById(Long twentyQuestionsId);

    boolean existsById(Long id);

    List<TwentyQuestions> findAll();
}
