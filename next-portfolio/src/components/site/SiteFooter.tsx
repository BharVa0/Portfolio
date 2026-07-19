import styles from "./SiteFooter.module.css";

export function SiteFooter() {
  return (
    <footer className={styles.footer} data-work-index-scope>
      <span>Edinburgh, Scotland</span>
      <span>Bharat Vyas Kodamana, 2026</span>
      <a href="mailto:bharatvyask@gmail.com">bharatvyask@gmail.com</a>
    </footer>
  );
}
