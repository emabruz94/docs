Tailwind ci offre tantissime classi altamente personalizzabili per definire lo stile direttamente da markup in modo comodo e veloce.

Ci permette anche di definire direttamente nella classe il valore associato alla proprietà css:
es. bg-[#5e4f9c]

Usare un valore specifico in questo modo porta però con se un problema: se un domani questo valore dovesse cambiare andrebbe ricercato e sostituito in tutto il progetto e richiederebbe un lavoro tedioso, propenso all'errore e che risulterebbe nella history di git come modifica di possibilmente numerosissimi file. Per ovviare a questo problema, come è già solito fare anche senza Tailwind o altre librerie, è sufficiente usare variabili css o scss. Qui verrà mostrato come sfruttare scss (es. $primary-color), ma è possibile fare lo stesso con variabili css (es. var(--primary-color))

Per integrare queste variabili dentro a Tailwind in modo da poter comunque usare comodamente le sue classi si può:

- creare le variabili scss da usare:
```
$primary-color: #004899;
$secondary-color: #82d0f5;
$tertiary-color: #5e4f9c;
```
- estendere il tema di Tailwind nella sua configurazione (per tailwind 4 direttamente nel foglio di stile principale, altrimenti sul file tailwind.config):
```
@use 'tailwindcss' as *;
@use 'tokens' as *;

@theme {
  --primary-color: #{$primary-color};
  --secondary-color: #{$secondary-color};
  --tertiary-color: #{$tertiary-color};
}
```
- usare le variabili direttamente nelle classi
```
<div class="bg-(--primary-color)">
oppure
<div class="bg-[var(--primary-color)]">
```
