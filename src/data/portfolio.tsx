import type { TFunction } from "i18next"

export const portfolio_tags = {
  achieve: (t: TFunction) => <div className="badge badge-soft badge-primary min-w-17 text-xs">{t("tags.achieve")}</div>,
  startup: (t: TFunction) => <div className="badge badge-soft badge-warning min-w-17 text-xs">{t("tags.startup")}</div>,
  experience: (t: TFunction) => (
    <div className="badge badge-soft badge-secondary min-w-17 text-xs">{t("tags.experience")}</div>
  ),
  etc: (t: TFunction) => <div className="badge badge-soft badge-tertiary min-w-17 text-xs">{t("tags.etc")}</div>,
}

export const smooreExperienceData = [
  {
    category: portfolio_tags.achieve,
    descriptions: ["portfolio.smoore.0"],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: ["portfolio.smoore.1"],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: ["portfolio.smoore.2"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.smoore.3"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.smoore.4"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.smoore.5"],
  },
  {
    category: portfolio_tags.etc,
    descriptions: ["portfolio.smoore.6"],
  },
]

export const canapeExperienceData = [
  {
    category: portfolio_tags.achieve,
    descriptions: ["portfolio.canape.0"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.canape.1"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.canape.2"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.canape.3"],
  },
  {
    category: portfolio_tags.etc,
    descriptions: ["portfolio.canape.4"],
  },
]

export const outsourcingExperienceData = [
  {
    company: "portfolio.outsourcing.hi_name",
    badgeType: "info",
    descriptions: ["portfolio.outsourcing.hi"],
  },
  {
    company: "portfolio.outsourcing.nor_name",
    badgeType: "warning",
    descriptions: ["portfolio.outsourcing.nimo"],
  },
  {
    company: "portfolio.outsourcing.drfor_name",
    badgeType: "error",
    descriptions: ["portfolio.outsourcing.drfor"],
  },
]

export const histories = [
  {
    date: "history.army_date",
    title: "history.army",
  },
  {
    date: "history.japan_living_date",
    title: "history.japan_living",
  },
  {
    date: "history.jp_cert_date",
    title: "history.jp_cert",
  },
  {
    date: "history.en_cert_date",
    title: "history.en_cert",
  },
  {
    date: "history.univ_date",
    title: "history.univ",
  },
  {
    date: "history.info_cert_date",
    title: "history.info_cert",
  },
  {
    date: "history.travel_date",
    title: "history.travel",
  },
]

export const rankingtogetherExperienceData = [
  {
    category: portfolio_tags.achieve,
    descriptions: ["portfolio.ranking.0"],
  },
  {
    category: portfolio_tags.achieve,
    descriptions: ["portfolio.ranking.1"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.ranking.2"],
  },
  {
    category: portfolio_tags.experience,
    descriptions: ["portfolio.ranking.3"],
  },
]
