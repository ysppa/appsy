import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import FeedsPage from "./FeedsPage";
import logo from "./../logo.svg";

export default function HomePage(props: any) {
  const [authState, setAuthState] = useState<any>({});

  useEffect(() => {
    setAuthState(props.auth.state);

    return () => {};
  }, [props]);

  return (
    <>
      {authState.userSignedIn ? (
        <FeedsPage
          auth={{ state: authState }}
          modal={props.modal}
          setModalProps={props.setModalProps}
        />
      ) : (
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h5>Welcome {authState.user ? authState.user.username : ""}</h5>
          {!authState.userSignedIn ? (
            <div>
              <section className="d-flex justify-content-center">
                <aside>
                  <Link to={"/login"} className="btn btn-primary">
                    Login
                  </Link>
                </aside>
                <aside className="ms-4">
                  <Link to={"/register"} className="btn btn-link">
                    Sign up
                  </Link>
                </aside>
              </section>
            </div>
          ) : (
            <></>
          )}
        </header>
        // <article
        //   id="preview-container"
        //   data-cy="preview-container"
        //   className="document-display"
        // >
        //   <h2 style={{ textAlign: "center" }}>
        //     CONVENTION DE MISE A DISPOSITION D'UN LOCAL
        //   </h2>

        //   <p>
        //     <strong>Le présent contrat est conclu entre :</strong>
        //   </p>

        //   <p>
        //     Monsieur Céléstin ANDRIANTAHINJANAHARY TSILAVINA né le 14 avril 1965
        //     , à Tamatave, résidant au Lot FMAI 124bis 67ha SUD à 101 -
        //     Antananarivo.
        //   </p>

        //   <p>Dénommé ci-après «le Prestataire», d'une part</p>

        //   <p>ET</p>

        //   <p>
        //     Monsieur Princy ANDRIANTAHINJANAHARY TSIMANARSON NARINDRANDRAIBE né
        //     le 1 novembre 1998 , à Antananarivo, résidant au Lot FMAI 124bis
        //     67ha SUD à Antananarivo - 101.
        //   </p>

        //   <p>Dénommé ci-après « le Bénéficiaire », d'autre part.</p>

        //   <p>
        //     Les parties ont convenu la mise à disposition par le Prestataire au
        //     Bénéficiaire du local ci- après décrit aux conditions développées
        //     ci-dessous :
        //   </p>

        //   <h3 id="article-1-description-du-local">
        //     ARTICLE 1 : DESCRIPTION DU LOCAL
        //   </h3>

        //   <p>
        //     Le local mis à la disposition du Bénéficiaire par le Prestataire est
        //     situé au Lot FMAI 124bis 67ha SUD à Antananarivo, 101 au deuxième
        //     étage.
        //   </p>

        //   <p>
        //     Le local est d'une superficie totale de 55m² et dispose de 3 pièces.
        //     Le plan du local est joint en annexe.
        //   </p>

        //   <p>
        //     Si le local se situe dans une copropriété, un exemplaire du
        //     règlement intérieur et/ou du règlement de copropriété devra être
        //     remis au Bénéficiaire lors de la conclusion du contrat.
        //   </p>

        //   <p>
        //     Le Bénéficiaire s'engage à respecter lesdits règlements pendant la
        //     durée du contrat.
        //   </p>

        //   <h3 id="article-2-destination-du-local">
        //     ARTICLE 2 : DESTINATION DU LOCAL
        //   </h3>

        //   <p>
        //     Le local est mis à disposition en vue d'y réaliser une activité
        //     mixte, plus précisément Développement informatique.
        //   </p>

        //   <p>
        //     Les Parties déclarent que local est adapté à l’activité du
        //     Bénéficiaire et conforme aux normes en vigueur à cet égard.
        //   </p>

        //   <h3 id="article-3-duree-de-la-mise-a-disposition">
        //     ARTICLE 3 : DUREE DE LA MISE A DISPOSITION
        //   </h3>

        //   <p>
        //     La mise à disposition du local est consentie par le Prestataire au
        //     Bénéficiaire pour une durée de 48 mois à partir de la signature du
        //     présent acte.
        //   </p>

        //   <h3 id="article-4-renouvellement-de-la-mise-a-disposition">
        //     ARTICLE 4 : RENOUVELLEMENT DE LA MISE A DISPOSITION
        //   </h3>

        //   <p>
        //     Au terme du bail convenu entre les Parties, le présent bail sera
        //     renouvelé par tacite reconduction pour une durée de 48 mois dans les
        //     mêmes conditions.
        //   </p>

        //   <h3 id="article-5-cong-">ARTICLE 5 : CONGÉ</h3>

        //   <p>
        //     Les Parties pourront si elles le souhaitent et sans motivation,
        //     décider d'y mettre un terme sous réserve de respecter un préavis de
        //     1 semaine.
        //   </p>

        //   <p>
        //     Afin d'être effective, cette décision devra obligatoirement être
        //     notifiée par lettre recommandée avec accusée de réception, ou par
        //     acte d'huissier.
        //   </p>

        //   <p>
        //     Le préavis court à compter de la réception de la lettre ou de l'acte
        //     d'huissier.
        //   </p>

        //   <h3 id="article-6-remuneration">ARTICLE 6 : REMUNERATION</h3>

        //   <p>La mise à disposition du présent local se fait à titre gratuit</p>

        //   <h3 id="article-7-obligations-des-parties">
        //     ARTICLE 7 : OBLIGATIONS DES PARTIES
        //   </h3>

        //   <p>D'une part, le Prestataire s'engage à :</p>

        //   <ul>
        //     <li>
        //       <span className="blur">
        //         nt eget nisl odio. Praesent vestibulum lorem sit amet egestas
        //         imperdiet. Morbi viverra
        //       </span>
        //       p<span className="blur">odo. Praesent ege</span>
        //     </li>
        //     <span className="blur"></span>

        //     <li>
        //       <span className="blur">
        //         {" "}
        //         ex. Quisque dictum lectus sit amet ornare ultricies. Mauris
        //         imperdiet just
        //       </span>
        //     </li>
        //     <span className="blur"></span>

        //     <li>
        //       <span className="blur">
        //         ctus sit amet ornare ultricies. Mauris imperdiet justo non odio
        //         tristique commodo. Praesent{" "}
        //       </span>
        //       l
        //       <span className="blur">
        //         {" "}
        //         euismod. Phasellus posuere tempus ipsum, id tempus magna dictum
        //         non. Aenean aliquam mauris eg
        //       </span>
        //       c<span className="blur">um non. Aen</span>
        //     </li>
        //     <span className="blur"></span>

        //     <li>
        //       <span className="blur">
        //         {" "}
        //         turpis. Mauris rutrum turpis ut metus pretium sagittis. Praesent
        //         tempor est a enim cursus port
        //       </span>
        //       �
        //       <span className="blur">r leo et libero vestibulum bibendum.</span>
        //       D
        //       <span className="blur">
        //         endrerit semper euismod. Phasellus posuere tempus ip
        //       </span>
        //     </li>
        //     <span className="blur"></span>

        //     <li>
        //       <span className="blur">
        //         re tempus ipsum, id tempus magna dictum non. Aenean aliquam
        //         mauris eget liber
        //       </span>
        //     </li>
        //     <span className="blur"></span>

        //     <li>
        //       <span className="blur">
        //         {" "}
        //         turpis. Mauris rutrum turpis ut metus pretium{" "}
        //       </span>
        //     </li>
        //     <span className="blur"></span>

        //     <li>
        //       <span className="blur">raesent vestibulum lorem sit</span>
        //     </li>

        //     <li>User du local en y apportant tous les soins raisonnable ;</li>

        //     <li>
        //       Répondre des dégradations survenues au cours de son usage du
        //       local;
        //     </li>

        //     <li>
        //       Avertir immédiatement le Prestataire de toute dégradation du bien
        //       qui surviendrait au cours de son usage de celui-ci ;
        //     </li>
        //   </ul>

        //   <h3 id="article-8-prestations-fournies-au-beneficiaire-par-le-proprietaire">
        //     ARTICLE 8: PRESTATIONS FOURNIES AU BENEFICIAIRE PAR LE PROPRIETAIRE
        //   </h3>

        //   <p>
        //     Le Prestataire s’engage à fournir au Bénéficiaire les prestations
        //     suivantes :
        //   </p>

        //   <ul>
        //     <li>
        //       Mise à disposition de matériel informatique et de
        //       télécommunication
        //     </li>
        //   </ul>

        //   <ul>
        //     <li>Salle de réunion</li>
        //   </ul>

        //   <h3 id="article-9-etat-des-lieux">ARTICLE 9 : ETAT DES LIEUX</h3>

        //   <p>
        //     Un état des lieux contradictoire sera dressé entre le Prestataire et
        //     le Bénéficiaire à l’occasion de l’entrée de celui-ci dans le local
        //     mis à disposition. En cas de désaccord entre les parties, l’état des
        //     lieux pourra être réalisé par un huissier, les frais étant partagés
        //     entre les parties. Le Bénéficiaire s’engage à garder les lieux dans
        //     l’état où ils se trouvent lors de son entrée. Il ne pourra effectuer
        //     aucuns travaux ni transformation sans le consentement écrit du
        //     Prestataire. En cas de dégradation importante, le Prestataire pourra
        //     exiger, au départ du Bénéficiaire, la remise en état du local mis à
        //     disposition.
        //   </p>

        //   <h3 id="article-10-assurances">ARTICLE 10 : ASSURANCES</h3>

        //   <p>
        //     Les Parties disposent d’une assurance couvrant les risques liés aux
        //     locaux mis à disposition dans les conditions mentionnées dans la
        //     présente convention.
        //   </p>

        //   <h3 id="article-11-clause-resolutoire">
        //     ARTICLE 11 : CLAUSE RESOLUTOIRE
        //   </h3>

        //   <p>
        //     En cas d’inexécution des obligations leur incombent, la Partie
        //     non-défaillante pourra résilier de plein droit le présent contrat.
        //     Elle devra préalablement mettre en demeure la partie défaillante,
        //     par lettre recommandée avec accusé de réception.
        //   </p>

        //   <h3 id="article-12-exemplaires">ARTICLE 12 : EXEMPLAIRES</h3>

        //   <p>
        //     Le présent contrat est rédigé en 2 exemplaires dont un remis au
        //     Prestataire et l'autre au Bénéficiaire.
        //   </p>

        //   <p>
        //     Fait le 17 janvier 2023, à <span className="new">Antananarivo</span>
        //     .
        //   </p>

        //   <p>
        //     Signature des parties, précédées de la mention « lu et approuvé »
        //   </p>

        //   <p>
        //     <br />

        //     <br />

        //     <br />
        //   </p>

        //   <div
        //     style={{ display: "inline-block", width: "300px", margin: "1em" }}
        //   >
        //     <div
        //       style={{
        //         marginBottom: "1em",
        //         fontWeight: "bold",
        //         fontStyle: "italic",
        //       }}
        //     >
        //       Le Prestataire
        //     </div>

        //     <div style={{ border: "solid black 1px", height: "150px" }}></div>

        //     <div
        //       style={{
        //         fontSize: "0.8em",
        //         color: "light-gray",
        //         fontStyle: "italic",
        //         position: "relative",
        //         left: "1em",
        //         bottom: "2em",
        //       }}
        //     >
        //       signature
        //     </div>
        //   </div>

        //   <div
        //     style={{ display: "inline-block", width: "300px", margin: "1em" }}
        //   >
        //     <div
        //       style={{
        //         marginBottom: "1em",
        //         fontWeight: "bold",
        //         fontStyle: "italic",
        //       }}
        //     >
        //       Le Bénéficiaire
        //     </div>

        //     <div style={{ border: "solid black 1px", height: "150px" }}></div>

        //     <div
        //       style={{
        //         fontSize: "0.8em",
        //         color: "light-gray",
        //         fontStyle: "italic",
        //         position: "relative",
        //         left: "1em",
        //         bottom: "2em",
        //       }}
        //     >
        //       signature
        //     </div>
        //   </div>
        // </article>
      )}
    </>
  );
}
