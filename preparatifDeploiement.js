/**
 * 1-Atribuer un Port de maniere dynamique
 * const port=process.env.PORT||3000
 * 2-Ne plus utiliiser nodemon
 * pourcela separer dans le fichier package.jon le mode developpement du mode production
 * "start":"node nomApp.js"
 * "dev":"nodemon nomApp.js"
 * 3-utiliser le framework express en mode Production
 * au demarage de l'application en mode Production
 * "start":"NODE_ENV=PRODUCTION node appName.js"
 *
 * 4-Les dependences de developpement ne sont plus utiliser en Production
 */
