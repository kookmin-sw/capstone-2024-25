package capstone.allbom.member.domaiin;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member save(Member member);

    Optional<Member> findById(Long memberId);

    Optional<Member> findBykakaoEmail(String kakaoEmail); // 카카오로그인 이메일로 찾기

    Optional<Member> findByloginId(String loginId); // 일반 로그인 아이디로 찾기

    boolean existsById(Long id);

    List<Member> findAll();
}