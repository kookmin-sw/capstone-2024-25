//package capstone.allbom.auth.service.general;
//
//import capstone.allbom.member.domaiin.Member;
//import lombok.Getter;
//import org.springframework.security.core.GrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//
//import java.util.Collection;
//
//@Getter
//public class PrincipalDetails implements UserDetails {
//
//    private Member member;
//
//    public PrincipalDetails(Member member) {
//        this.member=member;
//    }
//
//    @Override
//    public Collection<? extends GrantedAuthority> getAuthorities() {
//        /**
//         * TODO
//         * Member에 Role field 추가하기
//         */
//        return null;
//    }
//
//    public String getId() {
//        return member.getLoginId();
//    }
//
//    @Override
//    public String getPassword() {
//        return member.getLoginPassword();
//    }
//
//    @Override
//    public String getUsername() {
//        return null;
//    }
//
//    @Override
//    public boolean isAccountNonExpired() { //계정 만료 여부
//        return true;
//    }
//
//    @Override
//    public boolean isAccountNonLocked() { //계정 잠김 여부
//        return true;
//    }
//
//    @Override
//    public boolean isCredentialsNonExpired() { //credentials(password) 만료 여부
//        return true;
//    }
//
//    @Override
//    public boolean isEnabled() { //유저 사용 가능 여부
//        return true;
//    }
//}
