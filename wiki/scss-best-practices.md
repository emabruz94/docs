# BEM (Block Element Modifier)

E' uno degli standard per il naming delle classi SCSS/SASS/LESS più diffuso.  
Sfruttando le potenzialità offerte da SCSS, permette di mantenere il codice più pulito, organizzato, intuitivo e mantenibile.

- `Block`: il contenitore o il contesto in cui l'elemento si trova. (es. header)
- `Element`: un singolo componente inserito all'interno di un blocco. (es. header__link)
- `Modifier`: una qualsiasi variante del componente. (es. header__link--selected)

es.
```scss
<div class="header">
  <div class="header__text">text</div>
  <div class="header__text--red">text red</div>
</div>
```

```scss
.header {
  &__text {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    color: blue;

    &--red {
      @extend .header__text;
      color: #FF0000;
    }
  }
}
```

Riassunto: 
https://www.html.it/pag/50349/bem-block-element-modifier/ 



# Measure Unit

Quando si tratta di font e formattazione è facile cadere in errori di dimensioni generiche per le scritte presenti all’interno della nostra pagina web. CSS mette a disposizione le unità relative (relative units) come soluzione al problema, per fornire uno specifico unico stile ad una pagina web. 

Alcune di queste, **em** e **rem**, sostituiscono l’unità di misura generica e universale px (pixel). Le unità relative sono fondamentali perché al giorno d'oggi le dimensioni dello schermo sono disponibili in diverse dimensioni e forme. Se usiamo px, la dimensione dell'elemento rimane costante indipendentemente dalla dimensione dello schermo. Quindi l'uso di unità relative come **em** e **rem** è considerata una good practice.  

Le unità CSS sono quindi classificate in due modi: unità assolute e relative. 
%, em, rem, vw, vh, dvw, dvh sono tutte unità relative. 


- `%`: relativo al valore di quella proprietà per il genitore dell'elemento corrente
- `em`: relativo al font-size dell'elemento corrente
- `rem`: relativo al font-size dell'elemento root (html). “rem” = “root em”
- `vw`: relativo alla larghezza della finestra
- `vh`: relativo all'altezza della finestra
- `dvw`: nuova unità relativa alla larghezza della finestra, ma che reagisce ad eventi come il ridimensionamento della finestra o la rotazione del dispositivo (consigliato)
- `dvh`: nuova unità relativa all'altezza della finestra, ma che reagisce ad eventi come il ridimensionamento della finestra o la rotazione del dispositivo (consigliato)


Puoi usare **rem** ovunque riesci ad usare **em**. **rem** è una scelta migliore rispetto a **em**? 
Se per esempio, inavvertitamente, viene applicata di nuovo una dimensione del carattere di 0.5em, la dimensione si dimezza nuovamente rispetto all'originale e si ottiene un effetto indesiderato.
Con **rem** il problema non si presenta poichè si rifà sempre alla root, per questo viene considerata generalmente più sicura da usare.

Calcolo **rem**:

x rem = px desiderati / root font-size 

es.

Html/body font-size = 16px di default 
Desiderato per un elemento: 10px 
Risultato -> 10px / 16px = 0.625rem  



# Colors and variables

Quando è necessario usare un colore più volte all'interno del progetto è sempre consigliabile salvarlo all'interno di una variabile su un file .scss contenente tutte le variabili relative ai colori; questo per permettere di avere un unico punto centralizzato dove poter fare modifiche. Viene usato per la creazione di temi e brand, ma è applicabile a qualsiasi aspetto di styling per cui si ritiene opportuno raccogliere valori riutilizzati in diverse parti del progetto.

Per il naming delle variabili è solito usare il kebab-case:

$sass-orange: rgb(255, 140, 0);