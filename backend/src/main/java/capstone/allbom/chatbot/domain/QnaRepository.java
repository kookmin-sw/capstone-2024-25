package capstone.allbom.chatbot.domain;

import capstone.allbom.job.domain.Job;
import capstone.allbom.job.domain.Province;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    Qna save(Qna qna);

    Optional<Qna> findById(Long qnaId);

    List<Qna> findByChatbotId(Long chatbotId);

    List<Qna> findByTwentyQuestionsId(Long twentyQuestionsId);

    List<Qna> findAll();

    List<Qna> findAllByOrderByCreatedAtDesc();

    @Query("SELECT q FROM Qna q ORDER BY q.createdAt DESC")
    List<Qna> findAllByOrderByCreatedAtPagination(Pageable pageable);
}
