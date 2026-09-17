import { losSantosSVG } from './scene_los_santos';
import { mumbaiSVG } from './scene_mumbai';
import { delhiSVG } from './scene_delhi';
import { kolkataSVG } from './scene_kolkata';
import { portalSVG } from './scene_portal';

export type SceneKey = 'los-santos' | 'mumbai' | 'delhi' | 'kolkata' | 'portal';

const scenes: Record<SceneKey, string> = {
  'los-santos': losSantosSVG,
  'mumbai':     mumbaiSVG,
  'delhi':      delhiSVG,
  'kolkata':    kolkataSVG,
  'portal':     portalSVG,
};

interface SceneBgProps { scene: SceneKey; }

export function SceneBackground({ scene }: SceneBgProps) {
  return (
    <div
      className="fixed inset-0 z-0"
      style={{ width: '100%', height: '100%' }}
      dangerouslySetInnerHTML={{ __html: scenes[scene] }}
    />
  );
}
