# Introduction

### Installer les packages

Après avoir cloné le projet ou avoir pull des modifications (à faire sur client et server):
```bash
yarn install
```

### Demarrer le client
```bash
yarn start
```

### Demarrer le server
```bash
yarn dev
```

# Organiser le projet
## Pages

Créez un dossier pour votre page dans src/pages **(nom en camelCase)**. Puis créez un fichier **page.tsx** et **page.scss** pour votre page dans ce dossier **(nom en PascalCase)**.

**Exemple :**
Dans src/pages/signup,créez un fichier Signup.tsx :
```tsx
export default function Signup() {
  return (
    <div>
      <h1>Login</h1>
    </div>
  );
}
```

Ensuite importez le dans src/Routes.tsx :
```tsx
import Signup from "./pages/signup";
/* Reste du code ... */

<Router>
    <Routes>
        {/* path = url de la page, element = contenu que l'on souhaite afficher sur cet URL */}
        <Route path="/signup" element={<SignupPage />} />
    </Routes>
</Router>
/* Reste du code ... */
```

## Components

Si vous souhaitez créer un composant, crééz un fichier .tsx dans src/components **(nom en PascalCase)** :

## Fonctions utilitaires (Utils)
Dans src/ il y a un dossier utils Dedans ce trouve des fonctions utilitaires qui peuvent être utilisées d'autres fichiers.

Vous pouvez ajouter vos propres fonctions utilitaires dans ce dossier.
