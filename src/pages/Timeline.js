import './Timeline.css';

const TimelineEvent = (props) => {
    return (
        <div className="timeline-section">
            <h3>{ props.date }</h3>
            <img src="../images/timeline.png" />
            <h2>{ props.desc }</h2>
        </div>
    );
};

const Timeline = () => {
    return (
        <div className="timeline">
            <h1>Timeline</h1>
            <p>All Given Dates Are Estimations</p>
            <div>
                <TimelineEvent desc="Birth of Jesus" date="1 A.D." />
                <TimelineEvent desc="Jesus Visits Jerusalem During Passover" date="13 A.D." />
                <TimelineEvent desc="Miracle at Cana" date="30 A.D." />
                <TimelineEvent desc="Conversation with the Samarian Woman" date="30 A.D." />
                <TimelineEvent desc="Calling of the Twelve" date="31 A.D." />
                <TimelineEvent desc="The Sermon on the Mount" date="31 A.D." />
                <TimelineEvent desc="The Transfiguration" date="33 A.D." />
                <TimelineEvent desc="Triumphal Entry into Jerusalem" date="33 A.D." />
                <TimelineEvent desc="Jesus is Crucified" date="33 A.D." />
                <TimelineEvent desc="The Resurrection" date="33 A.D." />
            </div>
        </div>
    );
};

export default Timeline;