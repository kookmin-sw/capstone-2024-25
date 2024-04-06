package capstone.allbom.game.domain;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.jdbc.AutoConfigureTestDatabase;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.time.LocalDate;
import java.util.Arrays;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
@AutoConfigureTestDatabase(replace = AutoConfigureTestDatabase.Replace.NONE)
class SubjectRepositoryTest {

    @Autowired GameRepository gameRepository;
    @Autowired SubjectRepository subjectRepository;

    @Test
    void 게임과_과목명으로_조회한다() {
        // given
        Game game =gameRepository.save(new Game());
        Game game2 =gameRepository.save(new Game());

        Subject science = new Subject(
                null,
                game,
                SubjectType.SCIENCE,
                1,
                false,
                Arrays.asList()
        );

        Subject society = new Subject(
                null,
                game,
                SubjectType.SOCIETY,
                1,
                false,
                Arrays.asList()
        );

        Subject science2 = new Subject(
                null,
                game2,
                SubjectType.SCIENCE,
                1,
                false,
                Arrays.asList()
        );

        Subject society2 = new Subject(
                null,
                game2,
                SubjectType.SOCIETY,
                1,
                false,
                Arrays.asList()
        );
        subjectRepository.save(science);
        subjectRepository.save(society);
        subjectRepository.save(science2);
        subjectRepository.save(society2);

        // when
        Subject scienceFind = subjectRepository.findByGameAndType(game.getId(), SubjectType.SCIENCE)
                .orElseThrow();
        Subject societyFind = subjectRepository.findByGameAndType(game.getId(), SubjectType.SOCIETY)
                .orElseThrow();
        Subject scienceFind2 = subjectRepository.findByGameAndType(game2.getId(), SubjectType.SCIENCE)
                .orElseThrow();
        Subject societyFind2 = subjectRepository.findByGameAndType(game2.getId(), SubjectType.SOCIETY)
                .orElseThrow();

        // then
        Assertions.assertThat(science.getId()).isEqualTo(scienceFind.getId());
        Assertions.assertThat(society.getId()).isEqualTo(societyFind.getId());
        Assertions.assertThat(science2.getId()).isEqualTo(scienceFind2.getId());
        Assertions.assertThat(society2.getId()).isEqualTo(societyFind2.getId());

    }

}