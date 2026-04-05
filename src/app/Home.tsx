import { XIcon } from "lucide-react"
import { useCallback, useState } from "react"
import { useTranslation } from "react-i18next"
import Galaxy from "../components/Galaxy"
import Canape from "../components/LeftHero/Canape"
import Main from "../components/LeftHero/Main"
import RankingTogether from "../components/LeftHero/RankingTogether"
import Skills from "../components/LeftHero/Skills"
import SmartWordbook from "../components/LeftHero/SmartWordbook"
import Smore from "../components/LeftHero/Smore"
import Section from "../components/Section"
import { imageAssets } from "../data/images"
import {
  canapeExperienceData,
  histories,
  outsourcingExperienceData,
  rankingtogetherExperienceData,
  smooreExperienceData,
} from "../data/portfolio"
import { skillMap } from "../data/skills"
import useMediaQuery from "../lib/useMediaQuery"
import { cn } from "../lib/utils"

function Home() {
  const { t } = useTranslation()

  const { i18n } = useTranslation()
  const locale = i18n.language
  const isMobile = useMediaQuery("(max-width: 640px)")
  const [isOpenGalaxy, setIsOpenGalaxy] = useState(false)
  const [playNumber, setPlayNumber] = useState<number | null>(null)

  const onClickSection = useCallback((number?: number | null) => {
    setPlayNumber(number ?? null)
  }, [])

  const onClickRightSide: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (isMobile) {
      return
    }
    const target = e.target
    if (!(target instanceof Element)) return

    const sectionEl = target.closest('[id^="section-"]')
    if (!sectionEl) {
      setPlayNumber(null)
      if (isMobile) {
        setIsOpenGalaxy(false)
      }
      return
    }

    const m = sectionEl.id.match(/^section-(\d+)$/)
    if (!m) {
      setPlayNumber(null)
      if (isMobile) {
        setIsOpenGalaxy(false)
      }
      return
    }

    if (isMobile) {
      setIsOpenGalaxy(true)
    }
    onClickSection(Number(m[1]))
  }
  return (
    <main className={cn("w-screen h-dvh bg-black overflow-hidden", "sm:p-3")}>
      <div className={cn("w-full h-full overflow-scroll")}>
        <div
          id="content"
          className={cn(
            "mx-auto grid-cols-[26.25rem_36.25rem] rounded-md border border-border",
            "flex w-full sm:grid sm:w-250",
          )}
        >
          {/* left side */}
          <div
            className={cn(
              "w-full sticky top-0 left-0 bg-black rounded-l-md overflow-hidden",
              "fixed sm:sticky z-1000 h-dvh sm:h-[calc(100dvh-1.5rem)]",
              isMobile ? (isOpenGalaxy ? "block" : "hidden") : "block",
            )}
          >
            {isMobile && (
              <button
                onClick={() => setIsOpenGalaxy(false)}
                className={cn("absolute cursor-pointer top-4 right-4 z-10000")}
              >
                <XIcon className={cn("size-8 text-white")} />
              </button>
            )}
            <Galaxy
              mouseRepulsion={false}
              mouseInteraction={false}
              density={1}
              glowIntensity={0.3}
              saturation={0}
              hueShift={140}
              twinkleIntensity={0.3}
              rotationSpeed={0.1}
              repulsionStrength={2}
              autoCenterRepulsion={0}
              starSpeed={0.5}
              speed={1}
            />
            {playNumber === 1 && <Skills allLogosLoaded={true} />}
            {playNumber === 3 && <Smore />}
            {playNumber === 4 && <Canape />}
            {playNumber === 5 && <RankingTogether />}
            {playNumber === 7 && <SmartWordbook />}
            {playNumber !== 1 && playNumber !== 3 && playNumber !== 4 && playNumber !== 5 && playNumber !== 7 && (
              <Main />
            )}
          </div>
          <div className={cn("bg-mainBg overflow-hidden w-full", "sm:rounded-r-md")}>
            <div
              style={{
                backgroundImage: `url('${imageAssets.bg}')`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundRepeat: "no-repeat",
              }}
              className={cn("w-full h-40")}
            ></div>

            {/* right side */}
            <div onClick={onClickRightSide} id="right-side" className={cn("w-full relative", "px-4 sm:px-5")}>
              {/* profile */}
              <div className={cn("grid grid-cols-[5rem_1fr] gap-4 w-full mb-10", "px-4 sm:px-10")}>
                <img
                  src={imageAssets.profile}
                  alt="profile"
                  className={cn("w-20 h-20 rounded-full object-cover -translate-y-[30%]")}
                />
                <div className={cn("pt-2")}>
                  <p className={cn("text-2xl font-bold")}>{t("profile.name")}</p>
                  <p className={cn("text-xs text-description mb-1")}>{t("profile.position")}</p>
                  <p className={cn("text-xs text-description mb-1")}>{t("profile.period")}</p>
                  {/* <div className={cn("flex items-center gap-2")}>
                    <p className={cn("text-sm leading-4 text-description")}>{t("profile.description")}</p>
                  </div> */}
                </div>
              </div>

              <Section
                sectionNumber={12}
                onClickRightSide={onClickRightSide}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
                hasNoContent={true}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("intro.title")}</h3>
                </div>

                <ol className={cn("flex flex-col gap-2.5")}>
                  <li className={cn("text-white text-md font-semibold leading-6")}>{t("intro.content_1")}</li>
                </ol>
              </Section>

              <Section
                sectionNumber={11}
                onClickRightSide={onClickRightSide}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
                hasNoContent={true}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("merit.title")}</h3>
                </div>

                <ol className={cn("flex flex-col gap-2.5")}>
                  <li
                    dangerouslySetInnerHTML={{ __html: t("merit.content_1") }}
                    className={cn("text-white text-sm leading-6")}
                  />
                  <li
                    dangerouslySetInnerHTML={{ __html: t("merit.content_2") }}
                    className={cn("text-white text-sm leading-5.5")}
                  />
                  <li
                    dangerouslySetInnerHTML={{ __html: t("merit.content_3") }}
                    className={cn("text-white text-sm leading-6")}
                  />
                  <li
                    dangerouslySetInnerHTML={{ __html: t("merit.content_4") }}
                    className={cn("text-white text-sm leading-6")}
                  />
                  <li
                    dangerouslySetInnerHTML={{ __html: t("merit.content_5") }}
                    className={cn("text-white text-sm leading-6")}
                  />
                </ol>
              </Section>

              {/* skills */}
              <Section
                sectionNumber={1}
                onClickRightSide={onClickRightSide}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("")}>
                  <h3 className={cn("text-lg font-bold")}>{t("skills.title")}</h3>
                  <p
                    dangerouslySetInnerHTML={{ __html: t("skills.subtitle") }}
                    className={cn("text-sm text-description")}
                  />
                </div>

                <div className={cn("w-full flex py-6")}>
                  <div className={cn("h-0.25 w-full bg-border")}></div>
                </div>

                <ul className={cn("w-full flex flex-col gap-5 mb-2")}>
                  <li className={cn("flex flex-col")}>
                    <p className={cn("mb-1 font-semibold")}>{t("skills.category_1")}</p>
                    <ul className={cn("flex flex-wrap gap-1")}>
                      <img src={`https://img.shields.io/badge/${skillMap.react}`} alt="react" className={cn("h-5")} />
                      <img src={`https://img.shields.io/badge/${skillMap.vite}`} alt="vite" className={cn("h-5")} />
                      <img src={`https://img.shields.io/badge/${skillMap.bun}`} alt="bun" className={cn("h-5")} />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.flutter}`}
                        alt="flutter"
                        className={cn("h-5")}
                      />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.supabase}`}
                        alt="supabase"
                        className={cn("h-5")}
                      />
                    </ul>
                  </li>
                  <li className={cn("flex flex-col")}>
                    <p className={cn("font-semibold")}>{t("skills.category_2")}</p>
                    <p className={cn("text-xs text-description mb-2.5")}>{t("skills.category_2_desc")}</p>
                    <ul className={cn("flex flex-wrap gap-1")}>
                      <img src={`https://img.shields.io/badge/${skillMap.hono}`} alt="hono" className={cn("h-5")} />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.fastapi}`}
                        alt="fastapi"
                        className={cn("h-5")}
                      />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.cloudflareWorkers}`}
                        alt="cloudflare"
                        className={cn("h-5")}
                      />
                    </ul>
                  </li>
                  <li className={cn("flex flex-col pr-10")}>
                    <p className={cn("font-semibold")}>{t("skills.category_3")}</p>
                    <p className={cn("text-xs text-description mb-2.5")}>{t("skills.category_3_desc")}</p>
                    <ul className={cn("flex flex-wrap gap-y-2 gap-x-1")}>
                      <img src={`https://img.shields.io/badge/${skillMap.nextjs}`} alt="next" className={cn("h-5")} />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.tailwindcss}`}
                        alt="tailwindcss"
                        className={cn("h-5")}
                      />
                      <img src={`https://img.shields.io/badge/${skillMap.django}`} alt="django" className={cn("h-5")} />
                      <img src={`https://img.shields.io/badge/${skillMap.nestjs}`} alt="nestjs" className={cn("h-5")} />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.postgresql}`}
                        alt="postgresql"
                        className={cn("h-5")}
                      />
                      <img src={`https://img.shields.io/badge/${skillMap.docker}`} alt="docker" className={cn("h-5")} />
                      <img
                        src={`https://img.shields.io/badge/${skillMap.cloudflare}`}
                        alt="cloudflare"
                        className={cn("h-5")}
                      />
                    </ul>
                  </li>
                  <li className={cn("flex flex-col")}>
                    <p className={cn("mb-1 font-semibold")}>{t("skills.category_4")}</p>

                    <ul className={cn("flex flex-wrap gap-y-2 gap-x-1")}>
                      <img src={`https://img.shields.io/badge/${skillMap.spring}`} alt="spring" className={cn("h-5")} />
                      <img src={`https://img.shields.io/badge/${skillMap.aws}`} alt="aws" className={cn("h-5.25")} />
                    </ul>
                  </li>
                  <li className={cn("flex flex-col")}>
                    <p className={cn("mb-0.5 font-semibold")}>{t("skills.category_5")}</p>
                    <p
                      dangerouslySetInnerHTML={{ __html: t("skills.category_5_desc") }}
                      className={cn("text-sm text-description leading-4.5 mb-2.5")}
                    />
                  </li>
                </ul>
              </Section>

              {/* career */}
              <Section
                sectionNumber={2}
                hasNoContent={true}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("career.title")}</h3>
                  <p className={cn("text-sm text-description")}>{t("career.subtitle")}</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex gap-3")}>
                    <div
                      style={{ background: `url(${imageAssets.doda.squareLogo}) center / cover` }}
                      className={cn("box")}
                    ></div>
                    <div className={cn("flex flex-col")}>
                      <p className={cn("text-md font-bold mb-1")}>{t("career.company")}</p>
                      <p className={cn("text-[0.8rem] leading-4 text-description")}>{t("career.period")}</p>
                      <p className={cn("text-[0.8rem] leading-4 text-description")}>{t("career.role")}</p>
                    </div>
                  </div>
                </div>
              </Section>

              {/* SMOORE PRODUCT */}
              <Section
                sectionNumber={3}
                onClickRightSide={onClickRightSide}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("smoore.title")}</h3>
                  <p className={cn("text-sm text-description")}>{t("smoore.subtitle")}</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 ")}>
                      {t("smoore.description_1")}
                      <br />
                      {t("smoore.description_3")}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>{t("table.category")}</th>
                          <th>{t("table.description")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {smooreExperienceData.map((item, index) => (
                          <tr key={`smoore-product-${index}`}>
                            <td>{item.category(t)}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p
                                  key={`smoore-product-description-${index}-${descriptionIndex}`}
                                  dangerouslySetInnerHTML={{ __html: t(description) }}
                                />
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* CANAPE PRODUCT */}
              <Section
                sectionNumber={4}
                onClickRightSide={onClickRightSide}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("canape.title")}</h3>
                  <p className={cn("text-sm text-description")}>{t("canape.subtitle")}</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 ")}>
                      {t("canape.description_1")}
                      <br />
                      {t("canape.description_2")}
                      <br />
                      {t("canape.description_3")}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>{t("table.category")}</th>
                          <th>{t("table.description")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {canapeExperienceData.map((item, index) => (
                          <tr key={`canape-product-${index}`}>
                            <td>{item.category(t)}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p
                                  key={`canape-product-description-${index}-${descriptionIndex}`}
                                  dangerouslySetInnerHTML={{ __html: t(description) }}
                                />
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* RANKING TOGETHER PRODUCT */}
              <Section
                sectionNumber={5}
                onClickRightSide={onClickRightSide}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("ranking.title")}</h3>
                  <p className={cn("text-sm text-description")}>{t("ranking.subtitle")}</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col")}>
                    <p
                      dangerouslySetInnerHTML={{ __html: t("ranking.description_1") }}
                      className={cn("text-sm leading-4.5  mb-0.5")}
                    />
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>{t("table.category")}</th>
                          <th>{t("table.description")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {rankingtogetherExperienceData.map((item, index) => (
                          <tr key={`rankingtogether-product-${index}`}>
                            <td>{item.category(t)}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`rankingtogether-product-description-${index}-${descriptionIndex}`}>
                                  {t(description)}
                                </p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* OUTSOURCING PRODUCT */}
              <Section
                hasNoContent={true}
                sectionNumber={6}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("outsourcing.title")}</h3>
                  <p className={cn("text-sm text-description")}>{t("outsourcing.subtitle")}</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 ")}>
                      {t("outsourcing.description_1")}
                      <br />
                      {t("outsourcing.description_2")}
                    </p>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="table">
                      {/* head */}
                      <thead>
                        <tr>
                          <th>{t("table.company")}</th>
                          <th>{t("table.description")}</th>
                        </tr>
                      </thead>
                      <tbody>
                        {outsourcingExperienceData.map((item, index) => (
                          <tr key={`outsourcing-product-${index}`}>
                            <td>{t(item.company)}</td>
                            <td>
                              {item.descriptions.map((description, descriptionIndex) => (
                                <p key={`outsourcing-product-description-${index}-${descriptionIndex}`}>
                                  {t(description)}
                                </p>
                              ))}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </Section>

              {/* AI SMART WORDBOOK PRODUCT */}
              <Section
                onClickRightSide={onClickRightSide}
                sectionNumber={7}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("wordbook.title")}</h3>
                  <p className={cn("text-sm text-description")}>{t("wordbook.subtitle")}</p>
                </div>

                <div className={cn("w-full flex flex-col gap-4")}>
                  <div className={cn("w-full flex flex-col gap-3")}>
                    <p className={cn("text-sm leading-5.5 ")}>
                      {t("wordbook.description_1")}
                      <br />
                      {t("wordbook.description_2")}
                    </p>
                  </div>
                </div>
              </Section>

              {/* 자격증 등 */}
              <Section
                hasNoContent={true}
                onClickRightSide={onClickRightSide}
                sectionNumber={8}
                onClickSection={onClickSection}
                setIsOpenGalaxy={setIsOpenGalaxy}
              >
                <div className={cn("mb-4")}>
                  <h3 className={cn("text-lg font-bold")}>{t("activity.title")}</h3>
                </div>

                <div className="overflow-x-auto">
                  <table className="table">
                    {/* head */}
                    <thead>
                      <tr>
                        <th>{t("table.description")}</th>
                        <th>{t("table.date")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {locale === "ja" && (
                        <tr>
                          <td>インドク大学 放送芸能学科 入学</td>
                          <td>2013年</td>
                        </tr>
                      )}
                      {histories.map((item, index) => (
                        <tr key={`outsourcing-product-${index}`}>
                          <td>{t(item.title)}</td>
                          <td>{t(item.date)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Section>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Home
