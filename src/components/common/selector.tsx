import styles from "@/styles/components/selectBrand.module.scss";
import Image from "next/image";

export function CardSelector(props: any) {
    return (
        <div className={`${styles.card} max-[600px]:p-[20%]`}>
          
            {
              props.availabilty == false && props.page == 'buy'  ? 
              <div
              className={`${props.theme === "light" ? styles.light : styles.dark}`}
          >
              <div className={styles.image}>
                <div className={styles.soldOut}>
                <img src="/images/soldout.png" />
                </div>
                  {
                      props.imageUrl === null  ? 
                      
                      <Image
                      src="/android-chrome-512x512.png"
                      alt={props.name}
                      layout="fill"
                      loading="lazy"
                  />
                      : 
                      <Image
                      src={props.imageUrl}
                      alt={props.name}
                      layout="fill"
                      loading="lazy"
                  />
                  }

              </div>
              <strong>{props.name}</strong>
               </div>
              : 
              <div
              className={`${props.theme === "light" ? styles.light : styles.dark}`}
              onClick={props.onClick}
          >
              <div className={styles.image}>
                  {
                      props.imageUrl === null ? 
                      
                      <Image
                      src="/android-chrome-512x512.png"
                      alt={props.name}
                      layout="fill"
                  />
                      : 
                      <Image
                      src={props.imageUrl}
                      alt={props.name}
                      layout="fill"
                      onError={(e: any) => {
                        e.target.remove()
                      }}
                  />
                  
                  }

              </div>
              <strong>{props.name}</strong>
               </div>
            }
          
        </div>
    )
}
