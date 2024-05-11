package capstone.allbom.chatbot.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface TwentyQuestionsRepository extends JpaRepository<TwentyQuestions, Long> {
    TwentyQuestions save(TwentyQuestions twentyQuestions);

    Optional<TwentyQuestions> findById(Long twentyQuestionsId);

    boolean existsById(Long id);

    List<TwentyQuestions> findAll();

//    @Query("SELECT t FROM TwentyQuestions t WHERE t.member.id = :memberId ORDER BY t.createdAt DESC")
    @Query("SELECT t FROM TwentyQuestions t WHERE t.member.id = :memberId AND t.isComplete = false")
    Optional<TwentyQuestions> findByMemberId(Long memberId);
}
