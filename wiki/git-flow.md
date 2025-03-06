# Introduzione a Git Flow

**Git Flow** è un modello di branching per Git che aiuta a organizzare lo sviluppo di software in modo chiaro e strutturato. Utilizza una serie di rami predefiniti per separare le diverse fasi di sviluppo, facilitando il rilascio di nuove versioni e la gestione delle correzioni urgenti.

https://www.atlassian.com/git/tutorials/comparing-workflows/gitflow-workflow

![image](uploads/6c0d73559a06065cdd39a22e9265f5d4/image.png){width=430 height=312}

## Rami principali in Git Flow

1. **main** (o **master**) : Contiene il codice stabile e pronto per la produzione. Ogni commit in questo ramo rappresenta una versione di rilascio del software.
2. **develop**: Il ramo di sviluppo principale. Tutte le nuove funzionalità e correzioni vengono integrate in `develop` prima di essere pronte per il rilascio.

## Rami di supporto

- **feature**: Rami temporanei creati per sviluppare nuove funzionalità. Si basano su `develop` e vengono uniti a `develop` una volta completati.
  - Comando per creare una feature:  
    ```
    git flow feature start nome-funzionalità
    ```

- **release**: Rami creati per preparare una nuova versione per il rilascio. Vengono creati a partire da `develop` e uniti a `main` una volta rilasciati, dopo di che viene riportato `main` su `develop`.
  - Comando per creare una release:
    ```
    git flow release start versione
    ```

- **hotfix**: Rami creati per correggere bug critici in produzione. Vengono creati a partire da `main` e uniti sia a `master` che a `develop` dopo la correzione.
  - Comando per creare un hotfix:
    ```
    git flow hotfix start nome-bug
    ```

## Vantaggi di Git Flow

- **Organizzazione**: Permette di gestire in modo chiaro e strutturato lo sviluppo, il rilascio e le correzioni.
- **Collaborazione**: Rende facile lavorare in team, evitando conflitti grazie alla separazione dei rami.
- **Rilasci controllati**: Permette di testare le nuove funzionalità in modo isolato prima di integrarle nella versione di produzione.


