import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';

const FeatureList = [
  {
    title: 'my scratch programming',
    to:'/docs/category/tutorial---scratch',
    Svg: require('@site/static/img/scratch-logo.svg').default,
    description: (
      <>
        查看我的scratch编程作品
      </>
    ),
  },
  {
    title: 'my python programming',
    to: '/docs/category/tutorial---python',
    Svg: require('@site/static/img/python-svgrepo-com.svg').default,
    description: (
      <>
        查看我的python编程作品
      </>
    ),
  },
  {
    title: 'my c++ programming',
    to: '/docs/category/tutorial---c',
    Svg: require('@site/static/img/C++-Logo.wine.svg').default,
    description: (
      <>
        查看我的c++编程作品
      </>
    ),
  },
];

function Feature({Svg,to, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
      <Link  to={to}>
         <Svg className={styles.featureSvg} role="img" />
      </Link>
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
