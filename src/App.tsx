import React, { useEffect, useRef } from 'react';
import './App.css';

function App() {
    const numberSection= 10;
    const index = [];
    const sections: any  = [];
    const sectionRef: any = useRef([]);
    const colors = ["#3dc94a", "#234aa8", "#de2a45", "#d0b531"];

    //boucle pour créer les index
    for (let i = 1; i < numberSection; i++) {
        index.push(<li key={i}>{i}</li>);
    }

    //boucle pour créer les sections
    for (let i = 1; i < numberSection; i++) {
        if (colors[i] === undefined) colors.push(colors[i-4]);

        const sectionStyle = {
            backgroundColor: colors[i],
        }

        sections.push(<section ref={(el) => (sectionRef.current[i] = el)} key={i} className="section" style={sectionStyle}>{i}</section>);
    }


    useEffect(() => {
        // Fonction pour récupérer la position du milieu de chaque section
        const sectionSwitch = () => {
            const sectionsMiddle: number[] = [];

            // Boucle pour récupérer la position du milieu de chaque section
            if (sectionRef.current) {
                sectionRef.current.forEach((el: any) => {
                    // console.log(el.getBoundingClientRect().top)
                    const middle = el.getBoundingClientRect().top + (el.getBoundingClientRect().height / 2);
                    return sectionsMiddle.push(middle);
                })
            }

            // Fonction savoir quelle section est au milieu de la page de 0 à 8
            const currentSection = (sectionsMiddle: number[]) => {
                const middleOfPage = window.innerHeight / 2;
                let sectionIndex = sectionsMiddle.findIndex((middle: number) => middle >= middleOfPage);

                // Vérifier si la section suivante est également visible
                if (sectionsMiddle[sectionIndex] - middleOfPage > middleOfPage - sectionsMiddle[sectionIndex - 1]) {
                    sectionIndex -= 1;
                }

                return sectionIndex;
            }
            const changeIndex = (currentSection: any) => {
                const index = document.querySelectorAll('li');
                index.forEach((el: any) => {
                    el.classList.remove('active');
                })
                index[currentSection].classList.add('active');
            }

            // Initialisation des fonctions
            const activeSectionIndex = currentSection(sectionsMiddle);
            changeIndex(activeSectionIndex);
        }

        // Initialisation des fonctions
        sectionSwitch();

        // Ajout de l'écouteur d'événement
        window.addEventListener('scroll', sectionSwitch);


        // Suppression de l'écouteur d'événement
        return () => { window.removeEventListener('scroll', sectionSwitch)};

    }, [sectionRef]);

    return (
        <div className="app">
            <div className="app__index">
                <ul>
                    {index}
                </ul>
            </div>
            <div className="app__background">
                {sections}
            </div>
        </div>
    );
}

export default App;
