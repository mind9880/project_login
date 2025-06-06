import React from 'react';
import styles from './HomePage.css'; // Import CSS module

const Home = () => {
  return (
    <div className={styles.container}>
      <section className={styles.heroSection}>
        <h1 className={styles.title}>Welcome to Wisdom School</h1>
        <p className={styles.subtitle}>Empowering Students for a Brighter Future</p>
      </section>

      <section className={styles.introSection}>
        <p className={styles.description}>
          At Wisdom School, we are committed to nurturing academic excellence, fostering creativity,
          and building strong character in our students. Our curriculum blends traditional values with
          modern teaching methods to ensure holistic development. With dedicated teachers, modern
          facilities, and a supportive environment, we prepare young minds to excel in an ever-changing world.
        </p>

        <p className={styles.description}>
          Our institution takes pride in being a beacon of quality education, innovation, and inclusivity. We
          focus not only on academics but also on the emotional and social growth of every child.
        </p>
      </section>

      <section className={styles.highlightsSection}>
        <h2 className={styles.sectionTitle}>Why Choose Wisdom School?</h2>
        <ul className={styles.highlightsList}>
          <li>Modern Smart Classrooms</li>
          <li>Experienced and Caring Faculty</li>
          <li>Individual Attention and Mentorship</li>
          <li>Well-equipped Science and Computer Labs</li>
          <li>Safe and Secure Campus</li>
          <li>Regular Parent-Teacher Interactions</li>
        </ul>
      </section>

      <section className={styles.programsSection}>
        <h2 className={styles.sectionTitle}>Our Programs & Activities</h2>
        <ul className={styles.topicsList}>
          <li>Physical Education</li>
          <li>Public Speaking</li>
          <li>Art & Craft</li>
          <li>Music</li>
          <li>Life Skills</li>
          <li>Newspaper in Education</li>
          <li>STEM & Robotics</li>
          <li>Environmental Awareness</li>
          <li>Debate & Quiz Competitions</li>
          <li>Community Service</li>
          <li>Technology & Coding Clubs</li>
          <li>Cultural Festivities & Celebrations</li>
        </ul>
      </section>

      <section className={styles.visionSection}>
        <h2 className={styles.sectionTitle}>Our Vision & Mission</h2>
        <p className={styles.description}>
          Our vision is to develop confident, lifelong learners who are prepared to shape the future.
          Our mission is to provide a nurturing environment where students thrive academically,
          emotionally, and socially through quality education and innovative practices.
        </p>
      </section>
    </div>
  );
};

export default Home;