// import React, { useEffect } from "react";
import styles from "./SolarSystem.module.scss";
import MainContent from "../../components/MainContent/MainContent";

// const defaultAvatar =
//   "https://res.cloudinary.com/dsr6kwzrr/image/upload/v1729669892/photo_2024-10-23_10-30-18_nmluce.jpg";

const SolarSystem = () => {
  return (
    <MainContent title="">
   <div className={styles.solarBox}>
  <h1 className={styles.logo}>
    Solar explorer
    <span>in only CSS</span>
  </h1>
  <input
    className={styles.planet9}
    id="pluto"
    name="planet"
    type="radio"
  />
  <label className={styles.pluton + " " + styles.menu} htmlFor="pluto">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Pluto
      </h2>
      <h3>39.5 AU</h3>
    </div>
  </label>
  <input
    className={styles.planet8}
    id="neptune"
    name="planet"
    type="radio"
  />
  <label className={styles.neptune + " " + styles.menu} htmlFor="neptune">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Neptune
      </h2>
      <h3>30.06 AU</h3>
    </div>
  </label>
  <input
    className={styles.planet7}
    id="uranus"
    name="planet"
    type="radio"
  />
  <label className={styles.uranus + " " + styles.menu} htmlFor="uranus">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Uranus
      </h2>
      <h3>19.18 AU</h3>
    </div>
  </label>
  <input
    className={styles.planet6}
    id="saturn"
    name="planet"
    type="radio"
  />
  <label className={styles.saturn + " " + styles.menu} htmlFor="saturn">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Saturn
      </h2>
      <h3>9.539 AU</h3>
    </div>
  </label>
  <input
    className={styles.planet5}
    id="jupiter"
    name="planet"
    type="radio"
  />
  <label className={styles.jupiter + " " + styles.menu} htmlFor="jupiter">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Jupiter
      </h2>
      <h3>5.203 AU</h3>
    </div>
  </label>
  <input
    checked="checked"
    className={styles.planet4}
    id="mars"
    name="planet"
    type="radio"
  />
  <label className={styles.menu + " " + styles.mars} htmlFor="mars">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Mars
      </h2>
      <h3>1.524 AU</h3>
    </div>
  </label>
  <input
    checked="checked"
    className={styles.planet3}
    id="earth"
    name="planet"
    type="radio"
  />
  <label className={styles.menu + " " + styles.earth} htmlFor="earth">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Earth
      </h2>
      <h3>1 AU</h3>
    </div>
  </label>
  <input
    checked="checked"
    className={styles.planet2}
    id="venus"
    name="planet"
    type="radio"
  />
  <label className={styles.menu + " " + styles.venus} htmlFor="venus">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Venus
      </h2>
      <h3>0.723 AU</h3>
    </div>
  </label>
  <input
    checked="checked"
    className={styles.planet1}
    id="mercury"
    name="planet"
    type="radio"
  />
  <label className={styles.menu + " " + styles.mercury} htmlFor="mercury">
    <div className={styles.preview}></div>
    <div className={styles.info}>
      <h2>
        <div className={styles.pip}></div>
        Mercury
      </h2>
      <h3>0.39 AU</h3>
    </div>
  </label>
  <div className={styles.solar}>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.mercury}>
        <div className={styles.planetDescription + " " + styles.mercury}>
          <h2>Planet</h2>
          <h1>Mercury</h1>
          <p>
            The closest planet to the sun. It circles the sun faster than
            all the other planets, which is why Romans named it after
            their swift-footed messenger god.
          </p>
          <label htmlFor="readMercury">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.venus}>
        <div className={styles.planetDescription + " " + styles.venus}>
          <h2>Planet</h2>
          <h1>Venus</h1>
          <p>
            Named for the Roman goddess of love and beauty. In ancient
            times, Venus was often thought to be two different stars, the
            evening star and the morning star.
          </p>
          <label htmlFor="readVenus">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.earth}>
        <div className={styles.moon + " " + styles.moon}>
          <h3>Moon</h3>
          <h2>Moon</h2>
        </div>
        <div className={styles.trajectory + " " + styles.m}></div>
        <div className={styles.planetDescription + " " + styles.earth}>
          <h2>Planet</h2>
          <h1>Earth</h1>
          <p>
            Earth, our home. It is the only planet known to have an
            atmosphere containing free oxygen, oceans of liquid water on
            its surface, and, of course, life.
          </p>
          <label htmlFor="readEarth">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.mars}>
        <div className={styles.moon + " " + styles.deimos}>
          <h3>Moon</h3>
          <h2>Deimos</h2>
        </div>
        <div className={styles.trajectory + " " + styles.d}></div>
        <div className={styles.moon + " " + styles.phoebos}>
          <h3>Moon</h3>
          <h2>Phoebos</h2>
        </div>
        <div className={styles.trajectory + " " + styles.p}></div>
        <div className={styles.planetDescription + " " + styles.mars}>
          <h2>Planet</h2>
          <h1>Mars</h1>
          <p>
            Fourth planet from the Sun and the second smallest planet in
            the solar system. Named after the Roman god of war, often
            described as the “Red Planet”.
          </p>
          <label htmlFor="readMars">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.jupiter}>
        <div className={styles.planetDescription + " " + styles.jupiter}>
          <h2>Planet</h2>
          <h1>Jupiter</h1>
          <p>
            Jupiter is the largest planet in our solar system and is more
            than 11 times the diameter of Earth. It’s mostly composed of
            hydrogen and helium.
          </p>
          <label htmlFor="readJupiter">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.saturn}>
        <div className={styles.planetDescription + " " + styles.saturn}>
          <h2>Planet</h2>
          <h1>Saturn</h1>
          <p>
            Saturn is the sixth planet from the Sun and is known for its
            beautiful rings. It is a gas giant, mostly composed of hydrogen
            and helium.
          </p>
          <label htmlFor="readSaturn">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.uranus}>
        <div className={styles.planetDescription + " " + styles.uranus}>
          <h2>Planet</h2>
          <h1>Uranus</h1>
          <p>
            Uranus is the seventh planet from the Sun. It is an ice giant
            and is unique for its extreme axial tilt.
          </p>
          <label htmlFor="readUranus">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.neptune}>
        <div className={styles.planetDescription + " " + styles.neptune}>
          <h2>Planet</h2>
          <h1>Neptune</h1>
          <p>
            Neptune is the eighth planet from the Sun. It has the strongest
            winds in the solar system and is known for its deep blue color.
          </p>
          <label htmlFor="readNeptune">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
    <div className={styles.solarSystem}>
      <div className={styles.planet + " " + styles.pluton}>
        <div className={styles.planetDescription + " " + styles.pluton}>
          <h2>Planet</h2>
          <h1>Pluto</h1>
          <p>
            Pluto is a dwarf planet located in the Kuiper Belt. It used to be
            considered the ninth planet in the solar system until it was
            reclassified.
          </p>
          <label htmlFor="readPluto">
            <a>
              Read Mor
              <span>e</span>
            </a>
          </label>
        </div>
        <div className={styles.overlay}></div>
      </div>
    </div>
  </div>
        <input
          className={styles.read}
          id="readMercury"
          name="mercuryRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeMercury"></label>
        <input
          className={styles.read}
          id="closeMercury"
          name="mercuryRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Mercury</h1>
          <p>
            Mercury is the closest planet to the sun. As such, it circles the
            sun faster than all the other planets, which is why Romans named it
            after their swift-footed messenger god.
          </p>
          <p>
            The Sumerians also knew of Mercury since at least 5,000 years ago.
            It was often associated with Nabu, the god of writing. Mercury was
            also given separate names for its appearance as both a morning star
            and as an evening star. Greek astronomers knew, however, that the
            two names referred to the same solarBox, and Heraclitus, around 500
            B.C., correctly thought that both Mercury and Venus orbited the sun,
            not Earth.
          </p>
          <img src="https://i2.wp.com/www.astronomytrek.com/wp-content/uploads/2012/11/mercury-1.jpg?fit=678%2C381&amp;ssl=1" />
          <h2>A year on Mercury is just 88 days long.</h2>
          <p>
            One solar day (the time from noon to noon on the planet’s surface)
            on Mercury lasts the equivalent of 176 Earth days while the sidereal
            day (the time for 1 rotation in relation to a fixed point) lasts 59
            Earth days. Mercury is nearly tidally locked to the Sun and over
            time this has slowed the rotation of the planet to almost match its
            orbit around the Sun. Mercury also has the highest orbital
            eccentricity of all the planets with its distance from the Sun
            ranging from 46 to 70 million km.
          </p>
          <h2>Mercury is the smallest planet in the Solar Systm.</h2>
          <p>
            One of five planets visible with the naked eye a, Mercury is just
            4,879 Kilometres across its equator, compared with 12,742 Kilometres
            for the Earth.
          </p>
          <h2>Mercury is the second densest planet.</h2>
          <p>
            Even though the planet is small, Mercury is very dense. Each cubic
            centimetre has a density of 5.4 grams, with only the Earth having a
            higher density. This is largely due to Mercury being composed mainly
            of heavy metals and rock.
          </p>
          <h2>Mercury has wrinkles.</h2>
          <p>
            As the iron core of the planet cooled and contracted, the surface of
            the planet became wrinkled. Scientist have named these wrinkles,
            Lobate Scarps. These Scarps can be up to a mile high and hundreds of
            miles long.
          </p>
          <br />
        </div>
        <input
          className={styles.read}
          id="readVenus"
          name="venusRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeVenus"></label>
        <input
          className={styles.read}
          id="closeVenus"
          name="venusRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Venus</h1>
          <p>
            Venus, the second planet from the sun, is named for the Roman
            goddess of love and beauty. The planet — the only planet named after
            a female — may have been named for the most beautiful deity of her
            pantheon because it shone the brightest of the five planets known to
            ancient astronomers.
          </p>
          <p>
            In ancient times, Venus was often thought to be two different stars,
            the evening star and the morning star — that is, the ones that first
            appeared at sunset and sunrise. In Latin, they were respectively
            known as Vesper and Lucifer. In Christian times, Lucifer, or
            light-bringer, became known as the name of Satan before his fall.
            However, further observations of Venus in the space age show a very
            hellish environment. This makes Venus a very difficult planet to
            observe from up close, because spacecraft do not survive long on its
            surface.
          </p>
          <img src="https://3c1703fe8d.site.internapcdn.net/newman/gfx/news/hires/2014/2-whatistheave.jpg" />
          <h2>A day on Venus lasts longer than a year.</h2>
          <p>
            It takes 243 Earth days to rotate once on its axis (sidereal day).
            The planet’s orbit around the Sun takes 225 Earth days, compared to
            the Earth’s 365. A day on the surface of Venus (solar day) takes 117
            Earth days.
          </p>
          <h2>
            Venus rotates in the opposite direction to most other planets.
          </h2>
          <p>
            This means that Venus is rotating in the opposite direction to the
            Sun, this is also know as a retrograde rotation. A possible reason
            might be a collision in the past with an asteroid or other object
            that caused the planet to alter its rotational path. It also differs
            from most other planets in our solar systm by having no natural
            satellites.
          </p>
          <h2>Venus is the second brightest object in the night sky.</h2>
          <p>
            Only the Moon is brighter. With a magnitude of between -3.8 to -4.6
            Venus is so bright it can be seen during daytime on a clear day.
          </p>
          <h2>
            Atmospheric pressure on Venus is 92 times greater than the Earth’s.
          </h2>
          <p>
            While its size and mass are similar to Earth, the small asteroids
            are crushed when entering its atmosphere, meaning no small craters
            lie on the surface of the planet. The pressure felt by a human on
            the surface would be equivalent to that experienced deep beneath the
            sea on Earth.
          </p>
        </div>
        <input
          className={styles.read}
          id="readEarth"
          name="earthRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeEarth"></label>
        <input
          className={styles.read}
          id="closeEarth"
          name="earthRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Earth</h1>
          <p>
            Earth, our home, is the third planet from the sun. It is the only
            planet known to have an atmosphere containing free oxygen, oceans of
            liquid water on its surface, and, of course, life.
          </p>
          <p>
            Earth is the fifth largest of the planets in the solar systm —
            smaller than the four gas giants, Jupiter, Saturn, Uranus and
            Neptune, but larger than the three other rocky planets.
          </p>
          <img src="https://images.pexels.com/photos/414171/pexels-photo-414171.jpeg?auto=compress&amp;cs=tinysrgb&amp;h=350" />
          <h2>The Earth’s rotation is gradually slowing.</h2>
          <p>
            This deceleration is happening almost imperceptibly, at
            approximately 17 milliseconds per hundred years, although the rate
            at which it occurs is not perfectly uniform. This has the effect of
            lengthening our days, but it happens so slowly that it could be as
            much as 140 million years before the length of a day will have
            increased to 25 hours.
          </p>
          <h2>The Earth was once believed to be the centre of the universe.</h2>
          <p>
            Due to the apparent movements of the Sun and planets in relation to
            their viewpoint, ancient scientists insisted that the Earth remained
            static, whilst other celestial bodies travelled in circular orbits
            around it. Eventually, the view that the Sun was at the centre of
            the universe was postulated by Copernicus, though this is also not
            the case.
          </p>
          <h2>Earth has a powerful magnetic field.</h2>
          <p>
            This phenomenon is caused by the nickel-iron core of the planet,
            coupled with its rapid rotation. This field protects the Earth from
            the effects of solar wind.
          </p>
          <h2>There is only one natural satellite of the planet Earth.</h2>
          <p>
            As a percentage of the size of the solarBox it orbits, the Moon is
            the largest satellite of any planet in our solar systm. In real
            terms, however, it is only the fifth largest natural satellite.
          </p>
        </div>
        <input
          className={styles.read}
          id="readMars"
          name="marsRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeMars"></label>
        <input
          className={styles.read}
          id="closeMars"
          name="marsRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Mars</h1>
          <p>
            Mars is the fourth planet from the sun. Befitting the red planet
            bloody color, the Romans named it after their god of war. The Romans
            copied the ancient Greeks, who also named the planet after their god
            of war, Ares. Other civilizations also typically gave the planet
            names based on its color — for example, the Egyptians named it Her
            Dishes , meaning the red one, while ancient Chinese astronomers
            dubbed it the fire star.
          </p>
          <img src="https://1.bp.blogspot.com/-ou7Je3OVg6U/WYtxDqjNp_I/AAAAAAAACSQ/fsopS5VtFg4bmlv8hQNfiRYfJqTygCotQCLcBGAs/s2048/Martian%2Blandscape%2Bby%2BAmante%2BLombardi.jpg" />
          <h2>Mars and Earth have approximately the same landmass.</h2>
          <p>
            Even though Mars has only 15% of the Earth volume and just over
            10% of the Earth mass, around two thirds of the Earth surface is
            covered in water. Martian surface gravity is only 37% of the Earth
            (meaning you could leap nearly three times higher on Mars).
          </p>
          <h2>Mars is home to the tallest mountain in the solar system.</h2>
          <p>
            Olympus Mons, a shield volcano, is 21km high and 600km in diameter.
            Despite having formed over billions of years, evidence from volcanic
            lava flows is so recent many scientists believe it could still be
            active.
          </p>
          <h2>Only 18 missions to Mars have been successful.</h2>
          <p>
            As of September 2014 there have been 40 missions to Mars, including
            orbiters, landers and rovers but not counting flybys. The most
            recent arrivals include the Mars Curiosity mission in 2012, the
            MAVEN mission, which arrived on September 22, 2014, followed by the
            Indian Space Research Organization’s MOM Mangalyaan orbiter, which
            arrived on September 24, 2014. The next missions to arrive will be
            the European Space Agency’s ExoMars mission, comprising an orbiter,
            lander, and a rover, followed by NASA’s InSight robotic lander
            mission, slated for launch in March 2016 and a planned arrival in
            September, 2016.
          </p>
          <h2>Mars has the largest dust storms in the solar system.</h2>
          <p>
            They can last for months and cover the entire planet. The seasons
            are extreme because its elliptical (oval-shaped) orbital path around
            the Sun is more elongated than most other planets in the solar
            system.
          </p>
        </div>
        <input
          className={styles.read}
          id="readJupiter"
          name="jupiterRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeJupiter"></label>
        <input
          className={styles.read}
          id="closeJupiter"
          name="jupiterRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Jupiter</h1>
          <p>
            Jupiter is the largest planet in the solar system. Fittingly, it was
            named after the king of the gods in Roman mythology. In a similar
            manner, the ancient Greeks named the planet after Zeus, the king of
            the Greek pantheon.
          </p>
          <p>
            Jupiter helped revolutionize the way we saw the universe and
            ourselves in 1610, when Galileo discovered Jupiter four large
            moons — Io, Europa, Ganymede and Callisto, now known as the Galilean
            moons. This was the first time that celestial bodies were seen
            circling an object other than Earth, major support of the Copernican
            view that Earth was not the center of the universe.
          </p>
          <img src="http://hanaleikauaivacation.com/wp-content/uploads/parser/jupiter-landscape-1.jpg" />
          <h2>Jupiter is the fourth brightest object in the solar system.</h2>
          <p>
            Only the Sun, Moon and Venus are brighter. It is one of five planets
            visible to the naked eye from Earth.
          </p>
          <h2>
            The ancient Babylonians were the first to record their sightings of
            Jupiter.
          </h2>
          <p>
            This was around the 7th or 8th century BC. Jupiter is named after
            the king of the Roman gods. To the Greeks, it represented Zeus, the
            god of thunder. The Mesopotamians saw Jupiter as the god Marduk and
            patron of the city of Babylon. Germanic tribes saw this planet as
            Donar, or Thor.
          </p>
          <h2>Jupiter has the shortest day of all the planets.</h2>
          <p>
            It turns on its axis once every 9 hours and 55 minutes. The rapid
            rotation flattens the planet slightly, giving it an oblate shape.
          </p>
          <h2>Jupiter orbits the Sun once every 11.8 Earth years.</h2>
          <p>
            From our point of view on Earth, it appears to move slowly in the
            sky, taking months to move from one constellation to another.
          </p>
        </div>
        <input
          className={styles.read}
          id="readSaturn"
          name="SaturnRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeSaturn"></label>
        <input
          className={styles.read}
          id="closeSaturn"
          name="SaturnRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Saturn</h1>
          <p>
            Saturn is the sixth planet from the sun and the second largest
            planet in the solar system. Saturn was the Roman name for Cronus,
            the lord of the Titans in Greek mythology. Saturn is the root of the
            English word Saturday.
          </p>
          <p>
            Saturn is the farthest planet from Earth visible to the naked human
            eye, but it is through a telescope that the planet most
            outstanding features can be seen: Saturn rings. Although the other
            gas giants in the solar system — Jupiter, Uranus and Neptune — also
            have rings, those of Saturn are without a doubt the most
            extraordinary.
          </p>
          <img src="http://ak0.picdn.net/shutterstock/videos/4049260/thumb/1.jpg" />
          <h2>Saturn can be seen with the naked eye.</h2>
          <p>
            It is the fifth brightest object in the solar system and is also
            easily studied through binoculars or a small telescope.
          </p>
          <h2>
            Saturn was known to the ancients, including the Babylonians and Far
            Eastern observers.
          </h2>
          <p>
            It is named for the Roman god Saturn, and was known to the Greeks
            as Cronus.
          </p>
          <h2>Saturn is the flattest planet.</h2>
          <p>
            Its polar diameter is 90% of its equatorial diameter, this is due to
            its low density and fast rotation. Saturn turns on its axis once
            every 10 hours and 34 minutes giving it the second-shortest day of
            any of the solar systems planets.
          </p>
          <h2>Saturn orbits the Sun once every 29.4 Earth years.</h2>
          <p>
            Its slow movement against the backdrop of stars earned it the
            nickname of Lubadsagush from the ancient Assyrians. The name means
            “oldest of the old”.
          </p>
        </div>
        <input
          className={styles.read}
          id="readUranus"
          name="UranusRead"
          type="radio"
        />
        <label className={styles.closeBig} htmlFor="closeUranus"></label>
        <input
          className={styles.read}
          id="closeUranus"
          name="UranusRead"
          type="radio"
        />
        <div className={styles.panel}>
          <h1>Uranus</h1>
          <p>
            Uranus is the seventh planet from the sun and the first to be
            discovered by scientists. Although Uranus is visible to the naked
            eye, it was long mistaken as a star because of the planets dimness
            and slow orbit. The planet is also notable for its dramatic tilt,
            which causes its axis to point nearly directly at the sun.
          </p>
          <p>
            British astronomer William Herschel discovered Uranus accidentally
            on March 13, 1781, with his telescope while surveying all stars down
            to those about 10 times dimmer than can be seen by the naked eye.
            One star seemed different, and within a year Uranus was shown to
            follow a planetary orbit.
          </p>
          <img src="http://www.cosmosup.com/wp-content/uploads/2014/05/Uranus.jpg" />
          <h2>Uranus was the first planet discovered by telescope.</h2>
          <p>
            It was also the first planet discovered in modern times. It orbits
            the Sun once every 84 Earth years and is the third-largest planet by
            diameter.
          </p>
          <h2>Uranus is unique for its tilted axis.</h2>
          <p>
            The planet is tilted 98 degrees on its axis, causing it to appear to
            roll along its orbit. This is different from the other planets,
            which rotate upright.
          </p>
          <h2>Uranus has 27 moons.</h2>
          <p>
            These moons are named after characters in Shakespeare plays,
            including Miranda, Ariel and Caliban. Uranus also has a thin ring
            system.
          </p>
          <h2>Uranus has a blue-green color.</h2>
          <p>
            This color comes from methane in its atmosphere, which absorbs red
            light and reflects blue and green light.
          </p>
        </div>
      </div>
    </MainContent>
  );
};

export default SolarSystem;
