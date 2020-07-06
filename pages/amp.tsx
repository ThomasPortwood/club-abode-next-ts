/**
 * https://nextjs.org/docs/api-reference/next/amp
 * https://nextjs.org/docs/advanced-features/amp-support/typescript
 */

export const config = {amp: true};

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'amp-timeago': any;
      'amp-sidebar': any;
    }
  }
}

export default function Amp() {
  const date = new Date();

  return (
    <div>
      <p>Some time: {date.toJSON()}</p>
      <amp-timeago
        width="0"
        height="15"
        datetime={date.toJSON()}
        layout="responsive"
      >
        .
      </amp-timeago>
    </div>
  )
}