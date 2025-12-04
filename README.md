# Blog/chat Next.js + Supabase

Un Blog/chat full-stack combinant **Next.js** (frontend + API routes) et **Supabase** (base de données Postgres, authentification, stockage et realtime).

---

## Description du projet

Ce projet fournit :

* **Frontend** en Next.js (App Router)
* **Backend** via API Routes ou Server Actions
* **Base de données Postgres** gérée par Supabase
* **Stockage de fichiers** via Supabase Storage
* **Sécurité** assurée par Row Level Security (RLS)
* **Migrations** via Supabase CLI

## Installation locale

### 1️ Cloner le projet

```bash
git clone https://github.com/J-D-J-D/Securite-des-application.git
```

### 2️ Installer les dépendances

```bash
npm install
```

### 3️ Créer un projet Supabase

1. Rendez-vous sur [https://supabase.com](https://supabase.com)
2. Créez un nouveau projet
3. Récupérez :

   * `API URL`
   * `anon key`
   * `service_role key`

### 4️ Configurer les variables d’environnement

Crée un fichier `.env.local` à partir de `.env.example`.



## Variables d'environnement (.env.example)

Copier/coller dans `.env.example` :

```env
# URL et clé publique de Supabase (sécurisée par RLS)
NEXT_PUBLIC_SUPABASE_URL=_____
NEXT_PUBLIC_SUPABASE_ANON_KEY=_____

# Clé serveur Supabase (NE JAMAIS exposer côté client)
SUPABASE_SERVICE_ROLE_KEY=_____
```



## Exécution en local

### Démarrer en mode développement

```bash
npm run dev
```

Aller sur :
[http://localhost:3000](http://localhost:3000)

---

## Lancer Supabase en local (optionnel)


```bash
npm install -g supabase
supabase start
```

Appliquer les migrations :

```bash
supabase db push
```


## Documentations

* **Next.js** : [https://nextjs.org/docs](https://nextjs.org/docs)
* **Supabase** : [https://supabase.com/docs](https://supabase.com/docs)
* **Supabase CLI** : [https://supabase.com/docs/guides/cli](https://supabase.com/docs/guides/cli)


