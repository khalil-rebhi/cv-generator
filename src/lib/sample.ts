import type { CvData } from "./types";

/** Example CV (content of CV_ITEC_WME.docx) – used by the "Exemple" button and the sample script. */
export const sampleCv: CvData = {
  fileName: "CV_ITEC_WME",
  cvCode: "CV_ITEC_WME",
  title: "Product Owner & Consultant Data Semarchy",
  years: "14",
  techSkills: [
    { category: "Business Intelligence & Data Visualisation", items: "MSBI (SSIS, SSAS, SSRS)\nPower BI (Desktop, Premium, PowerPivot, Tabular, DAX, DAX Studio)\nQlikView, Qlik Sense, Excel" },
    { category: "ETL & Intégration de données", items: "Stambia / Semarchy xDI\nTalend, SSIS, Informatica\nAPI REST / SOAP\nKafka\nXML, JSON" },
    { category: "MDM (Master Data Management)", items: "Semarchy" },
    { category: "InterSystems & Interopérabilité", items: "InterSystems ObjectScript,\nInterSystems Ensemble / IRIS HL7, FHIR" },
    { category: "Langages & Bibliothèques Python", items: "SQL, PL/SQL, Python, JavaScript\nObjectScript, pandas, SQLAlchemy\nMatplotlib, PySpark" },
    { category: "Bases de données", items: "Oracle, SQL Server, PostgreSQL\nInterSystems Database" },
    { category: "Plateformes Data", items: "Snowflake, Databricks" },
    { category: "DevOps & Outils de développement", items: "Docker, GitHub, VS Code, intégration continue" },
    { category: "Cloud", items: "Administration Microsoft Azure" },
    { category: "ERP & Applications métiers", items: "SAP, Microsoft Dynamics NAV (Navision)" },
    { category: "Systèmes d’exploitation", items: "Linux, Windows" },
    { category: "Méthodologies", items: "Agile/Scrum" },
    { category: "Outils de gestion de projet", items: "Jira, Kanban, Asana, Microsoft Office" },
  ],
  funcSkills: [
    { label: "Pilotage de projets techniques, Data et CRM", description: "planification, coordination des équipes et suivi des livrables" },
    { label: "Analyse des besoins métiers", description: "rédaction des spécifications et analyse des processus comptables et des règles de calcul des primes et des salaires" },
    { label: "Gestion de produit en Agile", description: "gestion de la feuille de route et du backlog, rédaction d’user stories et suivi des sprints" },
    { label: "Conception et automatisation des flux de données", description: "intégration via ETL, API, batch et Kafka, supervision des traitements et support en production" },
    { label: "Modélisation et qualité des données", description: "conception de modèles relationnels et multidimensionnels, automatisation des contrôles via des scripts SQL" },
    { label: "Reporting décisionnel", description: "développement de rapports complexes sous SSRS et de tableaux de bord avec KPI sous Power BI et Qlik Sense." },
    { label: "Exploitation SQL Server", description: "déploiement, supervision et sécurisation des serveurs, suivi de leur disponibilité et de leurs performances" },
    { label: "Recette et accompagnement des utilisateurs", description: "organisation des tests, suivi des anomalies, formation et support" },
  ],
  sectors: "Assurance\nRetail / Distribution\nTélécommunication\nTransport & Logistique\nIndustrie\nSanté / Médical\nConseil & Services IT",
  diplomas: [
    { year: "2011", degree: "Maîtrise informatique appliqué à la gestion", school: "Faculté de science économique et de gestion" },
  ],
  certifications: [
    { name: "PSM (Professional Scrum Master)", description: "Management de projets selon la méthode Agile" },
    { name: "PSPO (Professional Scrum Product Owner)", description: "Gestion de produit et pilotage Agile" },
    { name: "M20462", description: "Administration des bases de données Microsoft SQL Server 2012" },
    { name: "M22463", description: "Implémentation d’un Data Warehouse avec Microsoft SQL Server 2012" },
  ],
  trainings: "Formation Semarchy XDM\nFormation InterSystems IRIS\nFormation PMP – Gestion de Projets (TenStep, Tunis)\nFormation Talend\nFormation Qlik Sense\nFormation Développement Fullstack Python\nFormation Développement Fullstack JavaScript (MERN)\nFormation Développement Fullstack Java",
  languages: [{ name: "Anglais", level: "professionnel" }],
  experiences: [
    {
      company: "Ajusteo",
      role: "Consultant Data Semarchy / Product Owner / Développeur InterSystems",
      startMonth: "12", startYear: "2021", endMonth: "", endYear: "", current: true,
      clients: "Imerys, Bastide Médical, FedEx",
      project: "Intervention sur des projets de gestion, centralisation et intégration de données reposant notamment sur Semarchy MDM, avec mise en place de flux automatisés entre les différentes applications du SI : Power BI, Microsoft Dynamics NAV (Navision), SAP et applications métiers.",
      roles: [
        {
          title: "Product Owner semarchy",
          tasks: `Définir une vision claire et cohérente du produit en collaboration avec les parties prenantes et en tenant compte des besoins métiers
Recueillir, analyser et formaliser les besoins liés aux projets Data et aux flux d’intégration, notamment dans des environnements Stambia / Semarchy xDI
Élaborer, maintenir et prioriser le backlog produit regroupant les fonctionnalités, évolutions, corrections et besoins liés aux flux de données
Rédiger les User Stories, spécifications fonctionnelles et critères d’acceptation associés aux projets Data et d’intégration
Clarifier les besoins auprès des développeurs et accompagner leur mise en œuvre tout au long du cycle de développement
Collaborer étroitement avec les Data Engineers, développeurs, testeurs et équipes métiers sur les problématiques d’intégration et d’échange de données
Suivre les développements et évolutions des flux réalisés avec Stambia / Semarchy xDI
Participer au suivi de projets intégrant des échanges de données via Kafka, en coordination avec les équipes techniques
Participer aux revues de sprint et valider les fonctionnalités développées selon les critères d’acceptation définis
Accepter ou rejeter les livrables selon leur conformité aux besoins fonctionnels et techniques
Assurer le suivi de l’avancement des projets et coordonner les différents acteurs impliqués
Identifier les risques, dépendances et points de blocage liés notamment aux flux et interfaces de données, et contribuer à la mise en place des actions correctives
Organiser les démonstrations des fonctionnalités développées et intégrer les retours utilisateurs dans le backlog
Communiquer régulièrement avec les parties prenantes et utilisateurs afin de recueillir les besoins d’évolution
Contribuer à l’amélioration continue des processus de gestion et d’intégration des données`,
        },
        {
          title: "Consultant Semarchy",
          tasks: `Recueillir et analyser les besoins clients en matière de gestion, d’intégration, de synchronisation et de qualité des données
Identifier les problématiques liées à l’intégration, à la gouvernance et à la fiabilisation des données
Concevoir des solutions de gestion et d’intégration de données basées sur Semarchy
Concevoir et adapter les modèles de données et référentiels dans Semarchy
Analyser les besoins d’intégration et définir les flux entre les différentes applications du SI
Mettre en œuvre et configurer les solutions Semarchy MDM chez les clients
Concevoir, développer et maintenir des flux d’intégration de données avec Semarchy xDI
Automatiser l’intégration des données provenant de différentes applications vers Semarchy MDM
Mettre en place des flux automatisés permettant de redistribuer les données consolidées depuis Semarchy vers Power BI, Navision et SAP
Développer et exploiter des flux d’intégration basés sur des ETL et API REST/SOAP
Mettre en œuvre et exploiter des flux de données en environnement batch et API
Importer, nettoyer, normaliser, transformer et contrôler les données intégrées dans Semarchy
Participer à des projets d’intégration dans des environnements SAP et Microsoft Dynamics NAV (Navision)
Intervenir sur des projets simples utilisant Kafka pour les échanges de données
Développer des règles de qualité des données, des workflows et des mécanismes de contrôle
Centraliser et fiabiliser les données avec Snowflake et Databricks
Contribuer à la centralisation, à la normalisation et à la fiabilisation des données
Assurer la cohérence des données échangées entre les différentes applications du SI
Intervenir sur les projets clients Imerys, Bastide Médical et FedEx dans des contextes Industrie, Retail / Distribution médicale et Transport / Logistique
Participer notamment à un projet Retail / Distribution médicale chez Bastide Médical, autour de l’intégration et de la fiabilisation des données avec Semarchy et Power BI
Réaliser les tests fonctionnels, les tests d’intégration et les tests de non-régression afin de garantir la qualité et la fiabilité des flux
Contrôler le bon fonctionnement des flux avant leur mise en production
Assurer les activités de RUN et de monitoring des flux de données
Superviser l’exécution des traitements et identifier les anomalies ou échecs de flux
Analyser et résoudre les incidents liés aux traitements et aux échanges de données
Assurer le support ainsi que la maintenance corrective et évolutive des flux d’intégration
Contribuer à l’optimisation et à l’amélioration continue de la fiabilité des traitements
Développer et optimiser les traitements de données avec PySpark sur Databricks
Documenter les flux, règles de gestion, processus d’intégration et procédures de support
Former et accompagner les utilisateurs finaux dans l’utilisation des solutions Semarchy
Fournir un support technique continu et contribuer aux évolutions de la solution`,
        },
        {
          title: "Développeur InterSystems",
          tasks: `Concevoir et développer des applications en utilisant InterSystems ObjectScript
Créer et optimiser des requêtes SQL pour les bases de données InterSystems
Développer des interfaces utilisateur et des API REST/SOAP pour les intégrations systèmes
Implémenter des règles métiers et des workflows permettant d’automatiser les processus
Configurer et déployer des connecteurs pour l’intégration de données entre différents systèmes
Mettre en œuvre des échanges de données basés sur HL7, FHIR, XML et JSON
Mettre en œuvre des flux interopérables avec InterSystems Ensemble / IRIS
Intégrer les solutions InterSystems avec des systèmes tiers à travers des API et protocoles standards
Développer et maintenir des flux d’intégration automatisés entre les applications métiers
Participer à l’automatisation des échanges de données entre différentes sources et applications cibles
Administrer les bases de données InterSystems : installation, configuration, sauvegarde et restauration
Surveiller et optimiser les performances des bases de données, notamment via l’indexation et le tuning des requêtes
Assurer la sécurité et la fiabilité des données échangées
Identifier et résoudre les incidents techniques liés aux solutions InterSystems
Réaliser les tests unitaires, fonctionnels et d’intégration
Documenter les développements, configurations, interfaces et flux de données
Fournir un support technique et accompagner les utilisateurs finaux
Collaborer avec les équipes métiers pour analyser les besoins et proposer des solutions adaptées
Participer aux réunions Agile / Scrum pour planifier, prioriser et suivre les tâches du backlog
Contribuer à l’amélioration continue des systèmes et des processus de développement
Identifier les opportunités d’automatisation et d’optimisation des processus existants`,
        },
      ],
      environment: "Semarchy xDI, Semarchy MDM, ETL, SSIS, Informatica, Kafka, API REST/SOAP, SQL, SQL Server, Snowflake, Databricks, PySpark, administration Azure, Power BI Desktop, Tabular, DAX, DAX Studio, SAP, Navision, InterSystems ObjectScript, InterSystems Ensemble / IRIS, XML, JSON, HL7, FHIR, Jira, Kanban",
      pageBreakBefore: false,
      inCareer: true,
    },
    {
      company: "Mezzo",
      role: "Chef de Projet Technique et Data CRM",
      startMonth: "4", startYear: "2020", endMonth: "8", endYear: "2021", current: false,
      clients: "Hermès, Altitude",
      project: "Pilotage du développement, de la mise en production et de la maintenance de quatre CRM. Prise en charge du volet Data, de l’automatisation des flux à la restitution des données, ainsi que du déploiement, de la supervision et de la sécurisation des serveurs SQL Server.",
      roles: [
        {
          title: "",
          tasks: `Piloter les volets techniques et Data de quatre CRM pour Hermès et Altitude, en définissant les objectifs, le planning, les ressources et les indicateurs de suivi
Recruter, former et encadrer l’équipe technique, répartir les responsabilités et suivre l’avancement des travaux dans Asana
Recueillir les besoins métiers et rédiger les spécifications techniques pour la personnalisation des CRM, leur intégration aux autres systèmes et la production des rapports
Développer et automatiser les flux ETL avec SSIS et Talend pour extraire, transformer et intégrer les données dans SQL Server
Développer des rapports complexes sous SSRS et des tableaux de bord sous Qlik Sense, de la définition des KPI avec les métiers à leur mise à disposition
Superviser l’installation, la configuration, la mise en production et la maintenance des CRM, en coordination avec les développeurs
Organiser les tests fonctionnels et techniques et suivre la détection, la correction et la documentation des anomalies
Déployer, superviser et sécuriser les serveurs SQL Server, en suivant leur disponibilité et leurs performances dans un environnement DevOps avec intégration continue
Gérer les comptes, les rôles et les droits d’accès aux CRM, en veillant au respect des exigences de sécurité et de protection des données
Former et accompagner les utilisateurs, assurer le support et proposer des améliorations à partir des retours et du suivi des performances
Préparer les rapports de suivi et communiquer l’avancement du projet et les résultats aux parties prenantes`,
        },
      ],
      environment: "SQL Server, SSIS, SSAS, SSRS, Talend, Qlik Sense, Asana, Kanban, Microsoft Office",
      pageBreakBefore: false,
      inCareer: true,
    },
    {
      company: "PhoneWord / Mezzo",
      role: "Data Analyst et Développeur BI - Responsable du pôle Data",
      startMonth: "6", startYear: "2016", endMonth: "3", endYear: "2020", current: false,
      clients: "Filiassur",
      project: "Automatisation des flux de données et développement de rapports pour la comptabilité et le calcul des primes et des salaires. Le projet visait à fiabiliser les données, à réduire les traitements manuels et à accélérer la production des rapports",
      roles: [
        {
          title: "",
          tasks: `Piloter le périmètre Data et coordonner les travaux de deux DBA et d’un développeur PL/SQL
Analyser les processus comptables et les règles de calcul des primes et des salaires avec les équipes métiers pour préciser les besoins d’automatisation et de reporting
Concevoir et faire évoluer les modèles de données relationnels et multidimensionnels selon les nouveaux besoins métiers
Développer et automatiser des workflows de collecte, de transformation et d’intégration avec SSIS pour centraliser les données issues de bases, de fichiers et d’API
Développer des scripts SQL pour automatiser les traitements récurrents, contrôler la qualité des données et préparer les jeux de données utilisés dans les rapports
Concevoir des rapports complexes sous SSRS pour répondre aux besoins de reporting récurrents et ponctuels
Développer des tableaux de bord et des KPI sous Power BI Premium, à partir de données issues de SQL Server
Présenter les résultats aux équipes métiers et à la direction et formuler des recommandations à partir des analyses`,
        },
      ],
      environment: "Power BI Premium, SQL Server, PowerPivot, SSIS, SSRS, SSAS",
      pageBreakBefore: false,
      inCareer: true,
    },
    {
      company: "ETAI",
      role: "Responsable CRM et Administration de base de données",
      startMonth: "9", startYear: "2012", endMonth: "12", endYear: "2016", current: false,
      clients: "",
      project: "Développement et Administration Technique du CRM Client",
      roles: [
        {
          title: "",
          tasks: `Configurer et administrer le CRM pour répondre aux besoins spécifiques de l'entreprise
Gérer les utilisateurs, les rôles et les autorisations dans le CRM
Concevoir, mettre en place et gérer la base de données associée au CRM
Assurer la collecte, le stockage et la gestion efficace des données client
Effectuer le monitoring du SGBD et mettre en œuvre un plan de surveillance pour résoudre rapidement les problèmes d’implémentation de données
Rédiger les spécifications techniques et fonctionnelles des bases de données
Réaliser des manipulations ETL
Personnaliser le CRM en fonction des exigences de l'entreprise (ajout de champs personnalisés, workflows, automatisations)
Développer et mettre en œuvre des règles de qualité des données pour garantir leur précision et leur cohérence
Intégrer le CRM avec d'autres systèmes et applications de l'entreprise pour assurer la cohérence des données dans tout l'écosystème
Gérer les migrations de données lors des mises à jour ou des changements de systèmes
Garantir la sécurité des données clients par la mise en place de politiques de sécurité robustes
Assurer la conformité aux réglementations en matière de protection des données (ex. RGPD)
Surveiller les performances du CRM et de la base de données, identifier et résoudre les problèmes éventuels
Effectuer des sauvegardes régulières et assurer la récupération en cas de sinistre
Former les utilisateurs finaux et le personnel interne à l'utilisation efficace du CRM et de la base de données
Créer et tenir à jour la documentation technique (manuels d'utilisation, procédures, politiques liées au CRM et aux bases de données)
Surveiller les performances du CRM et de la base de données pour identifier des pistes d’optimisation
Proposer et mettre en œuvre des améliorations pour accroître l’efficacité et l’efficience du système
Générer des rapports et des analyses à partir des données CRM pour aider l'entreprise à prendre des décisions éclairées
Suivre les tendances technologiques et les mises à jour du CRM afin d’en évaluer la pertinence pour l'entreprise`,
        },
      ],
      environment: "SSIS, SQL Server, Excel",
      pageBreakBefore: true,
      inCareer: true,
    },
  ],
};
