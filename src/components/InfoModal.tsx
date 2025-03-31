import React, { useCallback, useState } from "react";
import InfoModalProps from "@/types/InfoModalProps";
import styles from "@/styles/InfoModal.module.css";
import Card from "./Card";
import AbilityEffect from "@/types/AbilityEffect";
import { getAbilityEffect } from "@/services/pokeApi";

const InfoModal: React.FC<InfoModalProps> = ({
  url,
  name,
  number,
  abilities,
  types,
  weight,
  closeModal,
}) => {
  const [abilityName, setAbilityName] = useState<string | null>(null);
  const [abilityEffects, setAbilityEffects] = useState<AbilityEffect>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  const fetchAbilityEffect = useCallback(async (url: string) => {
    try {
      setLoading(true);
      setError(false);

      const data = await getAbilityEffect(url);
      setAbilityEffects(data);

      setLoading(false);
    } catch (error) {
      setLoading(false);
      setError(true);
      console.error("Error fetching ability effect:", error);
    }
  }, []);

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
      <header className={styles.header}>
        <Card number={number} name={name} url={url} />

        <section className={styles.info}>
          <div className={styles.infoAndWeight}>
            <div className={styles.typesContent}>
              <h3 className={styles.sectionTitle}>Types</h3>
              <ul className={styles.typesBox}>
                {types.map((type, index) => (
                  <li key={index} className={styles.type}>
                    {type.type.name.charAt(0).toUpperCase() +
                      type.type.name.slice(1)}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.weightContent}>
              <p className={styles.weight}>{weight / 10}kg</p>
              <h3 className={styles.sectionTitle}>Weight</h3>
            </div>
          </div>

          <div className={styles.abilitiesContent}>
            <h3 className={styles.sectionTitle}>Abilities</h3>
            <ul className={styles.abilitiesBox}>
              {abilities.map((ability, index) => (
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

        {loading ? (
          <p className={styles.loadingMessage}>{"> " + "Loading..."}</p>
        ) : error ? (
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

      <button onClick={closeModal} type="button" className={styles.closeModal}>
        Close
      </button>
    </div>
  );
};

export default InfoModal;
