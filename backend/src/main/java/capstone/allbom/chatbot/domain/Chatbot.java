package capstone.allbom.chatbot.domain;

import capstone.allbom.member.domain.Member;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter @Setter
public class Chatbot {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "chatbot_id")
    private Long id;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    private String profileImageUrl;
}
