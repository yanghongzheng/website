import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'my scratch programming',
    Svg: require('@site/static/img/scratch-logo.svg').default,
    description: (
      <>
        查看我的scratch编程作品
      </>
    ),
  },
  {
    title: 'my python programming',
    Svg: require('@site/static/img/python-svgrepo-com.svg').default,
    description: (
      <>
        查看我的python编程作品
      </>
    ),
  },
  {
    title: 'my c++ programming',
    Svg: require('@site/static/img/C++-Logo.wine.svg').default,
    description: (
      <>
        查看我的c++编程作品
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
