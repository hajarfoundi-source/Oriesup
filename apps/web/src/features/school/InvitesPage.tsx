import { useState } from 'react';
import { Card } from '../../components/Card';
import { Button } from '../../components/Button';
import { createSignupInvite } from '../../lib/api';

export function InvitesPage() {
  const [joinUrl, setJoinUrl] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCreate() {
    setCreating(true);
    setError(null);
    try {
      const result = await createSignupInvite({ expiresInDays: 60, maxUses: 500 });
      setJoinUrl(`${window.location.origin}${result.joinUrl}`);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setCreating(false);
    }
  }

  return (
    <div>
      <h1 className="mb-6 text-2xl font-bold">Invitations</h1>
      <Card className="max-w-lg">
        <p className="text-sm text-neutral-600">
          Génère un lien d'inscription à partager avec tes élèves : ils pourront créer leur propre compte directement.
        </p>
        <Button onClick={handleCreate} disabled={creating} className="mt-4">
          Générer un lien d'invitation
        </Button>
        {error && <p className="mt-3 text-sm text-red-600">{error}</p>}
        {joinUrl && (
          <div className="mt-4 rounded-xl bg-brandPrimary/10 p-3 text-sm">
            <p className="font-medium">Lien à partager :</p>
            <p className="break-all text-brandCta">{joinUrl}</p>
          </div>
        )}
      </Card>
    </div>
  );
}
