package capstone.allbom.member.domain;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberRepository extends JpaRepository<Member, Long> {

    Member save(Member member);

    Optional<Member> findById(Long memberId);

    Optional<Member> findBySocialId(String socialId); // 카카오로그인 아이디로 찾기

    Optional<Member> findByLoginId(String loginId); // 일반 로그인 아이디로 찾기

    boolean existsById(Long memberId);

    List<Member> findAll();
}
