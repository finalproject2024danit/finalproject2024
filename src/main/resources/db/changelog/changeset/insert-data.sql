INSERT INTO users (
    first_name, last_name, email, password, gender, date_of_birth, avatar, phones, photo_data, created_date, last_modified_date
) VALUES
      (
          'Alice', 'Johnson', 'alice.johnson@example.com', 'password123', 'Female', 631152000000,
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655770/runners_silhouettes_athletes_fitness_men_healthy_sunset_dusk-907233_ah4dpa.jpg', '12345',
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655770/runners_silhouettes_athletes_fitness_men_healthy_sunset_dusk-907233_ah4dpa.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Bob', 'Smith', 'bob.smith@example.com', 'securePass!', 'Male', 567993600000,
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655810/beautiful_girl_in_the_park_lying_on_the_leaves_autumn_portrait_romantic_park_feeling_in_love-1198265_pwzzdi.jpg', '12345',
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655810/beautiful_girl_in_the_park_lying_on_the_leaves_autumn_portrait_romantic_park_feeling_in_love-1198265_pwzzdi.jpg', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      ),
      (
          'Charlie', 'Brown', 'charlie.brown@example.com', 'charliePass!', 'Non-Binary', 441763200000,
          'https://res.cloudinary.com/dsr6kwzrr/image/upload/v1728655814/fitness_jump_health_woman_girl_healthy_fit_sportive-1103572_mshkng.jpg', '12345',
          'User photo data for Charlie', CURRENT_TIMESTAMP, CURRENT_TIMESTAMP
      );