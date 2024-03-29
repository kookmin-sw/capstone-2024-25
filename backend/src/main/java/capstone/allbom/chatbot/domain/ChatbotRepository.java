package capstone.allbom.chatbot.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ChatbotRepository extends JpaRepository<Chatbot, Long> {
    Chatbot save(Chatbot chatbot);

    Optional<Chatbot> findById(Long chatbotId);

    Optional<Chatbot> findByMemberId(Long memberId);

    boolean existsById(Long id);
}
