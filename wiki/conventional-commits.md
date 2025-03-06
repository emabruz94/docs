# Conventional Commits

Questo documento descrive le convenzioni per la scrittura di messaggi di commit, così da mantenere una cronologia chiara e facilmente comprensibile, migliorando la leggibilità e la tracciabilità del progetto. Seguendo una struttura predefinita per il messaggio si è in grado di capire subito il tipo di modifica effettuata nel codice.

### Sintassi

Si compone di tre parti principali:

**tipo(ambito): descrizione**

1. **Tipo**: descrive il tipo di cambiamento che il commit introduce. I tipi comuni includono:
   - `build`: installazione nuove librerie, modifiche a livello di build o configurazione
   - `feat`: nuova funzionalità
   - `fix`: correzione di bug
   - `style`: modifiche allo stile
   - `refactor`: refactoring del codice per pulizia o ottimizzazione, senza cambiamenti nel comportamento
   - `perf`: modifiche per aumentare le performance
   - `test`: aggiunta o aggiornamento dei test
   - `docs`: aggiornamenti alla documentazione
   - `chore`: piccole modifiche che non comportano grosse modifiche (generico)
2. **Ambito**: indica quale parte del progetto è stata modificata. Nel caso in cui il progetto fosse collegato a Jira, l'ideale sarebbe di scrivere direttamente l'ID del ticket che descrive il task per cui è stata fatta la modifica. Altrimenti, è sufficiente scrivere in una sola parola la feature o l'elemento che è stato impattato (es. 'auth', 'header', 'api')
3. **Descrizione**: una breve e chiara descrizione del cambiamento.

### Esempi di Commit

- `build(ng2-charts): aggiunta libreria ng2-charts per implementazione di grafici`
- `feat(DGT-23): aggiunta pagina per il dettaglio utente`
- `fix(auth): risolto errore di autenticazione`
- `style(header): cambiati colori del menu nell'header`
- `refactor(models): riorganizzato il codice dei modelli utente`
- `docs(readme): aggiunto esempio di uso per il componente`