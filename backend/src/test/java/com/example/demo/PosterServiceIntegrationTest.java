// package com.example.demo;

// import com.example.demo.dto.PosterDTO;
// import com.example.demo.repository.PosterRepository;
// import com.example.demo.service.PosterService;
// import org.junit.jupiter.api.Test;
// import org.springframework.beans.factory.annotation.Autowired;
// import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
// import org.springframework.context.annotation.Import;
// import org.springframework.test.annotation.DirtiesContext;

// import java.time.LocalDateTime;
// import java.util.Arrays;
// import java.util.List;

// import static org.junit.jupiter.api.Assertions.*;

// @DataJpaTest
// @Import(PosterService.class) // import your service
// @DirtiesContext(classMode = DirtiesContext.ClassMode.AFTER_EACH_TEST_METHOD) // reset DB after each test
// class PosterServiceIntegrationTest {

//     @Autowired
//     private PosterService posterService;

//     @Autowired
//     private PosterRepository posterRepository;

//     @Test
//     void testCreateAndGetPosterById() {
//         PosterDTO dto = new PosterDTO(
//                 null,
//                 "Test Poster",
//                 "Short description",
//                 "Full description of the poster",
//                 "$1000",
//                 "For Sale",
//                 "Category A",
//                 "/image.jpg",
//                 Arrays.asList("/image1.jpg", "/image2.jpg"),
//                 0,
//                 false,
//                 "Test Location",
//                 "+123456789",
//                 "test@example.com",
//                 LocalDateTime.now(),
//                 LocalDateTime.now()
//         );

//         PosterDTO saved = posterService.createPoster(dto);

//         assertNotNull(saved.getId(), "Saved poster should have an ID assigned");
//         assertEquals(dto.getTitle(), saved.getTitle());

//         PosterDTO fetched = posterService.getPosterById(saved.getId());
//         assertEquals(saved.getId(), fetched.getId());
//         assertEquals(saved.getTitle(), fetched.getTitle());
//     }

//     @Test
//     void testGetAllPosters() {
//         PosterDTO dto1 = new PosterDTO(
//                 null,
//                 "Poster 1",
//                 "Desc 1",
//                 "Full Desc 1",
//                 "$500",
//                 "For Rent",
//                 "Category 1",
//                 "/img1.jpg",
//                 Arrays.asList("/img1a.jpg"),
//                 0,
//                 false,
//                 "Location 1",
//                 "+111",
//                 "one@example.com",
//                 LocalDateTime.now(),
//                 LocalDateTime.now()
//         );

//         PosterDTO dto2 = new PosterDTO(
//                 null,
//                 "Poster 2",
//                 "Desc 2",
//                 "Full Desc 2",
//                 "$1500",
//                 "Trip",
//                 "Category 2",
//                 "/img2.jpg",
//                 Arrays.asList("/img2a.jpg"),
//                 0,
//                 false,
//                 "Location 2",
//                 "+222",
//                 "two@example.com",
//                 LocalDateTime.now(),
//                 LocalDateTime.now()
//         );

//         posterService.createPoster(dto1);
//         posterService.createPoster(dto2);

//         List<PosterDTO> posters = posterService.getAllPosters();
//         assertEquals(2, posters.size());
//         assertTrue(posters.stream().anyMatch(p -> p.getTitle().equals("Poster 1")));
//         assertTrue(posters.stream().anyMatch(p -> p.getTitle().equals("Poster 2")));
//     }

//     @Test
//     void testGetPosterById_NotFound() {
//         RuntimeException exception = assertThrows(RuntimeException.class, () -> posterService.getPosterById(999L));
//         assertEquals("Poster not found with ID: 999", exception.getMessage());
//     }
// }
