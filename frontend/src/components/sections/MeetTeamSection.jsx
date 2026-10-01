import Reveal from '../ui/Reveal';
import teamImage from '../../assets/images/team/team.png';
import { teamGroups, teamPageCopy } from '../../data/team';

function TeamPhoto({ className = '' }) {
  return (
    <img
      className={`meet-team__photo ${className}`.trim()}
      src={teamImage}
      alt={teamPageCopy.imageAlt}
      width={1600}
      height={900}
      loading="lazy"
      decoding="async"
    />
  );
}

function TeamMemberCard({ member }) {
  const hasContent = Boolean(member?.name || member?.image);

  return (
    <li
      className={`meet-team__card${hasContent ? ' has-content' : ''}`}
      aria-hidden={hasContent ? undefined : true}
    >
      {member?.image ? (
        <img src={member.image} alt={member.name || ''} className="meet-team__card-image" />
      ) : null}
    </li>
  );
}

function TeamGroupSection({ group }) {
  const isLeadership = group.id === 'leadership';

  return (
    <section
      className={`meet-team__group${isLeadership ? ' meet-team__group--leadership' : ''}`}
      aria-labelledby={`meet-team-${group.id}-title`}
    >
      <Reveal className="meet-team__group-header">
        <p className="meet-team__eyebrow">{teamPageCopy.eyebrow}</p>
        <h2 id={`meet-team-${group.id}-title`} className="meet-team__group-title">
          {group.title}
        </h2>
        <p className="meet-team__group-description">{group.description}</p>
      </Reveal>

      <ul className="meet-team__grid">
        {group.members.map((member) => (
          <TeamMemberCard key={member.id} member={member} />
        ))}
      </ul>
    </section>
  );
}

export default function MeetTeamSection() {
  return (
    <section className="meet-team" aria-labelledby="meet-team-hero-title">
      <div className="meet-team__shell">
        <Reveal className="meet-team__hero">
          <p className="meet-team__eyebrow">{teamPageCopy.eyebrow}</p>
          <h1 id="meet-team-hero-title" className="meet-team__hero-title">
            {teamPageCopy.hero.title}
          </h1>
          <p className="meet-team__hero-description">{teamPageCopy.hero.description}</p>
        </Reveal>

        <Reveal className="meet-team__photo-wrap" y={24}>
          <TeamPhoto />
        </Reveal>

        <div className="meet-team__groups">
          {teamGroups.map((group) => (
            <TeamGroupSection key={group.id} group={group} />
          ))}
        </div>

        <Reveal className="meet-team__closing">
          <p className="meet-team__eyebrow">{teamPageCopy.eyebrow}</p>
          <h2 className="meet-team__closing-title">{teamPageCopy.closing.title}</h2>
          <p className="meet-team__closing-description">{teamPageCopy.closing.description}</p>
        </Reveal>

        <Reveal className="meet-team__photo-wrap meet-team__photo-wrap--closing" y={24}>
          <TeamPhoto />
        </Reveal>
      </div>
    </section>
  );
}
