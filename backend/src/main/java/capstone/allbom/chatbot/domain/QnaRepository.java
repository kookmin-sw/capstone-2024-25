package capstone.allbom.chatbot.domain;

import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface QnaRepository extends JpaRepository<Qna, Long> {
    Qna save(Qna qna);

    Optional<Qna> findById(Long qnaId);

    List<Qna> findByMemberId(Long memberId);

    List<Qna> findByTwentyQuestionsId(Long twentyQuestionsId);

    List<Qna> findAll();

    @Query("SELECT q FROM Qna q WHERE q.member.id = :memberId ORDER BY q.createdAt DESC")
    List<Qna> findAllOrderByCreatedAtDesc(Long memberId);

    @Query("SELECT q FROM Qna q WHERE q.member.id = :memberId ORDER BY q.createdAt DESC")
    List<Qna> findAllOrderByCreatedAtPagination(Long memberId, Pageable pageable);
}
