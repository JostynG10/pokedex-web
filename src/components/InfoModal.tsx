import React, { useCallback, useEffect, useState } from "react";
import { getAbilityEffect, getPokemonInfo } from "@/services/pokeApi";
import { FaExclamationTriangle } from "react-icons/fa";
import InfoModalProps from "@/types/InfoModalProps";
import styles from "@/styles/InfoModal.module.css";
import Card from "./Card";
import AbilityEffect from "@/types/AbilityEffect";
import PokemonInfo from "@/types/PokemonInfo";

const InfoModal: React.FC<InfoModalProps> = ({
  url,
  name,
  number,
  closeModal,
}) => {
  const [loadingData, setLoadingData] = useState<boolean>(false);
  const [errorData, setErrorData] = useState<boolean>(false);
  const [data, setData] = useState<PokemonInfo | null>(null);
  const [loadingEffect, setLoadingEffect] = useState<boolean>(false);
  const [errorEffect, setErrorEffect] = useState<boolean>(false);
  const [abilityEffects, setAbilityEffects] = useState<AbilityEffect>();
  const [abilityName, setAbilityName] = useState<string | null>(null);

  const fetchPokemonInfo = useCallback(async () => {
    try {
      setLoadingData(true);
      setErrorData(false);
      const data: PokemonInfo = await getPokemonInfo(name);
      setData(data);

      setLoadingData(false);
    } catch (error) {
      setLoadingData(false);
      setErrorData(true);
      console.error("Error fetching Pokemon info:", error);
    }
  }, [name]);

  const fetchAbilityEffect = useCallback(async (url: string) => {
    try {
      setLoadingEffect(true);
      setErrorEffect(false);

      const data = await getAbilityEffect(url);
      setAbilityEffects(data);

      setLoadingEffect(false);
    } catch (error) {
      setLoadingEffect(false);
      setErrorEffect(true);
      console.error("Error fetching ability effect:", error);
    }
  }, []);

  useEffect(() => {
    fetchPokemonInfo();
  }, [fetchPokemonInfo]);

  const handleAbilityClick = (name: string, url: string) => {
    if (abilityName === name) {
      setAbilityName(null);
      setAbilityEffects(undefined);
    } else {
      setAbilityName(name);
      fetchAbilityEffect(url);
    }
  };

  return (
    <div className={styles.content}>
      {loadingData ? (
        <div className={styles.screen}>
          <h2 className={styles.screenMessage}>Loading data...</h2>
        </div>
      ) : errorData ? (
        <>
          <div className={styles.screen}>
            <FaExclamationTriangle className={styles.screenIcon} />

            <h2 className={styles.screenMessage}>Failed to load data.</h2>

            <button
              onClick={fetchPokemonInfo}
              type="button"
              className={styles.retryButton}
            >
              Retry
            </button>
          </div>

          <button
            onClick={closeModal}
            type="button"
            className={styles.closeModal}
          >
            Close
          </button>
        </>
      ) : data ? (
        <>
          <header className={styles.header}>
            <Card number={number} name={name} url={url} />

            <section className={styles.info}>
              <div className={styles.infoAndWeight}>
                <div className={styles.typesContent}>
                  <h3 className={styles.sectionTitle}>Types</h3>
                  <ul className={styles.typesBox}>
                    {data.types.map((type, index) => (
                      <li key={index} className={styles.type}>
                        {type.type.name.charAt(0).toUpperCase() +
                          type.type.name.slice(1)}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className={styles.weightContent}>
                  <p className={styles.weight}>{data.weight / 10}kg</p>
                  <h3 className={styles.sectionTitle}>Weight</h3>
                </div>
              </div>

              <div className={styles.abilitiesContent}>
                <h3 className={styles.sectionTitle}>Abilities</h3>
                <ul className={styles.abilitiesBox}>
                  {data.abilities.map((ability, index) => (
                    <li
                      key={index}
                      className={`${styles.ability} ${
                        abilityName === ability.ability.name
                          ? styles.selectedAbility
                          : ""
                      }`}
                      onClick={() =>
                        handleAbilityClick(
                          ability.ability.name,
                          ability.ability.url
                        )
                      }
                    >
                      {ability.ability.name.charAt(0).toUpperCase() +
                        ability.ability.name.slice(1)}
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </header>

          <section className={styles.abilityScreen}>
            <h3 className={styles.screenMessage}>Tap to see abilities</h3>

            {loadingEffect ? (
              <p className={styles.loadingMessage}>{"> " + "Loading..."}</p>
            ) : errorEffect ? (
              <p className={styles.loadingMessage}>
                {"> " + "Error loading ability effect"}
              </p>
            ) : abilityEffects ? (
              <div className={styles.abilityBox}>
                <div className={styles.abilityEffect}>
                  <p className={styles.effectDescription}>
                    {"> " +
                      abilityName!.charAt(0).toUpperCase() +
                      abilityName!.slice(1) +
                      ": " +
                      abilityEffects.effect}
                  </p>
                </div>
              </div>
            ) : null}
          </section>

          <button
            onClick={closeModal}
            type="button"
            className={styles.closeModal}
          >
            Close
          </button>
        </>
      ) : null}
    </div>
  );
};

export default InfoModal;
