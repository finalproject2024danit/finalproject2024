INSERT INTO users (
    first_name, last_name, email, password, gender, date_of_birth, avatar, phones, photo_data, created_date, last_modified_date
) VALUES
      (
          'Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'FEMALE', 631152000000,
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655770/runners_silhouettes_athletes_fitness_men_healthy_sunset_dusk-907233_ah4dpa.jpg', '12345',
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655770/runners_silhouettes_athletes_fitness_men_healthy_sunset_dusk-907233_ah4dpa.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Bob', 'Smith', 'bob.smith@example.com', 'securePass!', 'MALE', 567993600000,
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655810/beautiful_girl_in_the_park_lying_on_the_leaves_autumn_portrait_romantic_park_feeling_in_love-1198265_pwzzdi.jpg', '12345',
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655810/beautiful_girl_in_the_park_lying_on_the_leaves_autumn_portrait_romantic_park_feeling_in_love-1198265_pwzzdi.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Charlie', 'Brown', 'charlie.brown@example.com', 'charliePass!', 'NOT_SPECIFIED', 441763200000,
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655814/fitness_jump_health_woman_girl_healthy_fit_sportive-1103572_mshkng.jpg', '12345',
          'User photo data for Charlie', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'David', 'Wilson', 'david.wilson@example.com', 'davidSecure!', 'MALE', 504576000000,
          'photo', '12345',
          'User photo data for David', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Edward', 'Davis', 'edward.davis@example.com', 'edwardPass123', 'MALE', 378604800000,
          'photo', '12345',
          'User photo data for Edward', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Frank', 'Miller', 'frank.miller@example.com', 'frankSecurePass', 'MALE', 662688000000,
          'photo', '12345',
          'User photo data for Frank', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'George', 'Taylor', 'george.taylor@example.com', 'georgePass!', 'MALE', 283996800000,
          'photo', '12345',
          'User photo data for George', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Henry', 'Moore', 'henry.moore@example.com', 'henrySecure1', 'MALE', 505190400000,
          'photo', '12345',
          'User photo data for Henry', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Isaac', 'Clark', 'isaac.clark@example.com', 'isaacPass!', 'MALE', 246931200000,
          'photo', '12345',
          'User photo data for Isaac', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'James', 'White', 'james.white@example.com', 'jamesSecurePass!', 'MALE', 312768000000,
          'photo', '12345',
          'User photo data for James', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      );
