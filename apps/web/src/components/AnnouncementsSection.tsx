import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { db } from '../lib/firebaseClient';
import { Card } from './Card';
import { resolveLocalizedText, type AnnouncementDoc, type Locale } from '@oriesup/shared-types';

interface AnnouncementRow extends AnnouncementDoc {
  id: string;
}

/** serviceBasePath, if given (e.g. `/s/demo/student`), makes announcements linked to a
 * service clickable through to that service's detail page. Omit where there's no such
 * page to land on (e.g. the school dashboard). */
export function AnnouncementsSection({ serviceBasePath }: { serviceBasePath?: string }) {
  const { t, i18n } = useTranslation();
  const [announcements, setAnnouncements] = useState<AnnouncementRow[]>([]);

  useEffect(() => {
    (async () => {
      const snap = await getDocs(query(collection(db, 'announcements'), where('active', '==', true), orderBy('createdAt', 'desc')));
      setAnnouncements(snap.docs.map((d) => ({ id: d.id, ...(d.data() as AnnouncementDoc) })));
    })();
  }, []);

  if (announcements.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-lg font-bold">{t('student.announcements.title')}</h2>
      <div className="space-y-3">
        {announcements.map((a) => {
          const clickable = Boolean(serviceBasePath && a.linkedServiceId);
          const content = (
            <Card className="overflow-hidden !p-0 transition hover:shadow-md">
              {a.imageUrl && <img src={a.imageUrl} alt={resolveLocalizedText(a.title, i18n.language as Locale)} className="h-40 w-full object-cover" />}
              <div className="p-6">
                <p className="font-semibold">{resolveLocalizedText(a.title, i18n.language as Locale)}</p>
                <p className="mt-1 text-sm text-neutral-600">{resolveLocalizedText(a.body, i18n.language as Locale)}</p>
              </div>
            </Card>
          );
          return clickable ? (
            <Link key={a.id} to={`${serviceBasePath}/services/${a.linkedServiceId}`}>
              {content}
            </Link>
          ) : (
            <div key={a.id}>{content}</div>
          );
        })}
      </div>
    </section>
  );
}
