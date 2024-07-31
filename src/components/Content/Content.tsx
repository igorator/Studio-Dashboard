import styles from './content.module.css';

export function Content({ children }: { children: React.ReactNode }) {
  return <main className={styles.pageContent}>{children}</main>;
}
