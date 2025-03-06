# Versioning con Major, Minor e Patch

Il versioning semantico è un sistema di numerazione delle versioni che aiuta a comunicare chiaramente il tipo di modifiche apportate a un software in modo che si possa facilmente comprendere la compatibilità e l'impatto delle nuove versioni

## Sintassi

La versione di un software è rappresentata da tre numeri separati da punti:

MAJOR.MINOR.PATCH

Ogni componente del numero di versione ha un significato specifico e viene aggiornato in base alla natura delle modifiche al software.

### 1. **MAJOR**
Il numero **MAJOR** viene incrementato quando vengono introdotte modifiche incompatibili con le versioni precedenti, che rompono la retrocompatibilità. Queste modifiche potrebbero includere cambiamenti nell'API o nel comportamento del software che richiedono modifiche ai progetti che dipendono dal software.

#### Quando incrementare la versione MAJOR:
- Modifiche che rompono la compatibilità con la versione precedente.
- Rimozione di funzionalità o API precedenti.
- Cambiamenti significativi nella struttura del progetto o nel flusso di lavoro che richiedono un adattamento da parte degli utenti.

**Esempio**: Se il software ha una versione `2.5.3` e vengono apportate modifiche che non sono compatibili con la versione `2.x.x`, la nuova versione sarà `3.0.0`.

### 2. **MINOR**
Il numero **MINOR** viene incrementato quando vengono aggiunte nuove funzionalità compatibili con le versioni precedenti, senza rompere la compatibilità con le versioni più vecchie. Le nuove funzionalità sono opzionali e non influiscono sul comportamento di base del software.

#### Quando incrementare la versione MINOR:
- Aggiunta di nuove funzionalità senza rompere la compatibilità.
- Aggiunta di nuove API o metodi opzionali che non alterano il comportamento esistente.
- Modifiche che migliorano il software ma non introducono modifiche breaking.

**Esempio**: Se il software ha una versione `1.4.2` e viene aggiunta una nuova funzionalità compatibile con la versione precedente, la nuova versione sarà `1.5.0`.

### 3. **PATCH**
Il numero **PATCH** viene incrementato per modifiche che correggono errori o bug senza aggiungere nuove funzionalità. Questi cambiamenti non influenzano la compatibilità del software e non richiedono modifiche nei progetti che dipendono dal software.

#### Quando incrementare la versione PATCH:
- Correzione di bug e miglioramenti minori che non cambiano il comportamento del software.
- Risoluzione di problemi di sicurezza, stabilità o performance.
- Ottimizzazione del codice che non introduce nuove funzionalità.

**Esempio**: Se il software ha una versione `1.3.4` e vengono corretti dei bug senza modificare il comportamento delle funzionalità esistenti, la nuova versione sarà `1.3.5`.

## Esempi di Versioning

1. **Esempio di incremento MAJOR**:
   - Versione attuale: `2.5.3`
   - Modifica: Cambiamenti significativi che rompono la compatibilità.
   - Nuova versione: `3.0.0`

2. **Esempio di incremento MINOR**:
   - Versione attuale: `2.5.3`
   - Modifica: Aggiunta di nuove funzionalità compatibili.
   - Nuova versione: `2.6.0`

3. **Esempio di incremento PATCH**:
   - Versione attuale: `2.5.3`
   - Modifica: Correzione di bug.
   - Nuova versione: `2.5.4`

## Variazioni nel Versioning

Oltre ai numeri di versione standard, possono essere aggiunti altri suffissi per specificare lo stato di sviluppo della versione. I più comuni sono:

- **Alpha, Beta, RC (Release Candidate)**: Questi suffissi indicano che la versione è ancora in fase di sviluppo, test o valutazione.
  - `1.0.0-alpha`: Prima versione in fase di sviluppo.
  - `1.0.0-beta`: Versione beta, da testare.
  - `1.0.0-rc.1`: Prima release candidate.

### Esempi:
- `2.0.0-beta`: Versione beta di una nuova major version.
- `1.0.0-rc.1`: Prima release candidate per la versione `1.0.0`.

## Gestire il Versioning con Git

Una buona pratica di gestione del versioning in un progetto Git è quella di utilizzare i **tag** per associare ogni versione al commit specifico nel repository. 

Ad esempio:
git tag v1.0.0 git push origin v1.0.0

Questo comando crea un tag per la versione `1.0.0` e lo spinge nel repository remoto.



