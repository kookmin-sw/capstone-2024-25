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

    @Query("SELECT q FROM Qna q WHERE q.member.id = :memberId AND q.twentyQuestions.id = :twentyQuestionsId ORDER BY q.createdAt DESC")
    List<Qna> findByTwentyQuestionsAndMember(Long memberId, Long twentyQuestionsId);

    List<Qna> findAll();

    @Query("SELECT q FROM Qna q WHERE q.member.id = :memberId AND q.isGame = false ORDER BY q.createdAt DESC")
    List<Qna> findAllOrderByCreatedAtDesc(Long memberId);

    @Query("SELECT q FROM Qna q WHERE q.member.id = :memberId AND q.isGame = false ORDER BY q.createdAt DESC")
    List<Qna> findAllOrderByCreatedAtPagination(Long memberId, Pageable pageable);

    // 스무고개
    @Query("SELECT q FROM Qna q JOIN q.twentyQuestions tq WHERE q.member.id = :memberId AND tq.isComplete = false ORDER BY q.createdAt DESC")
    List<Qna> findAllTwentyQuestionsOrderByCreatedAtDesc(Long memberId);

//    @Query("SELECT q, tq.id FROM Qna q JOIN q.twentyQuestions tq WHERE q.member.id = :memberId AND tq.isComplete = false ORDER BY q.createdAt DESC")
//    List<Object[]> findAllTwentyQuestionsOrderByCreatedAtDesc(Long memberId);

}
