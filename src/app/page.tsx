import PostsList from '@/components/PostsList'
import AuthPage1 from '@/components/AuthPage1'
import CreatePosts from '@/components/CreatePosts'

export default function HomePage() {
  return (
    <main className="p-4">
      <h1 className="text-2xl font-bold mb-4">Bienvenue</h1>
      <AuthPage1 />

      <section className="mt-8">
        <h2 className="text-xl font-semibold mb-2">Publier un post</h2>
        <CreatePosts />
        <br />

        <h2 className="text-xl font-semibold mb-2">Posts publiés</h2>
        <PostsList />
      </section>
    </main>
  )
}
