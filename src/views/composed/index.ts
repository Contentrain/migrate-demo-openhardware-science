// Pages composed from sections, keyed by WordPress id. A migration writes one
// view per page it composed (hero, cards, text between them) and lists it
// here; every other page renders its body as rich text (PageView). A composed
// view takes PageView's props, so the route table treats both alike.
import type PageView from '../PageView.astro'
import PageProgramsAi from './PageProgramsAi.astro'
import PageGoshSocialMediaInformationFormAi from './PageGoshSocialMediaInformationFormAi.astro'
import PageGosh2017ReportAi from './PageGosh2017ReportAi.astro'
import PageGlobalOpenScienceHardwareRoadmapAi from './PageGlobalOpenScienceHardwareRoadmapAi.astro'
import PageGoshHistoryAi from './PageGoshHistoryAi.astro'
import PageGosh2026KathmanduNepalAi from './PageGosh2026KathmanduNepalAi.astro'
import PageStemWorkshopsAi from './PageStemWorkshopsAi.astro'
import PageGosh2017Ai from './PageGosh2017Ai.astro'
import PageAboutAi from './PageAboutAi.astro'
import PageHomeAi from './PageHomeAi.astro'
import Page2016participants from './Page2016participants.astro'
import Page2018Program from './Page2018Program.astro'
import Page2019GlGoshFaq from './Page2019GlGoshFaq.astro'
import Page2019GlGoshHackathon from './Page2019GlGoshHackathon.astro'
import Page2019GlGoshProgram from './Page2019GlGoshProgram.astro'
import Page2021GoshCommunityCouncilElections from './Page2021GoshCommunityCouncilElections.astro'
import Page2021ResearchFundingSalons from './Page2021ResearchFundingSalons.astro'
import Page2022GoshCommunityCouncilElection from './Page2022GoshCommunityCouncilElection.astro'
import Page2023GoshCommunityCouncilElection from './Page2023GoshCommunityCouncilElection.astro'
import Page2024GoshCommunityCouncilElection from './Page2024GoshCommunityCouncilElection.astro'
import Page2025GoshCommunityCouncilElection from './Page2025GoshCommunityCouncilElection.astro'
import Page51522 from './Page51522.astro'
import Page57522 from './Page57522.astro'
import PageAmbassadorProgram from './PageAmbassadorProgram.astro'
import PageApply from './PageApply.astro'
import PageBangla from './PageBangla.astro'
import PageBudget from './PageBudget.astro'
import PageCernLogistics from './PageCernLogistics.astro'
import PageChinese from './PageChinese.astro'
import PageCollaborativeDevelopmentProgramme from './PageCollaborativeDevelopmentProgramme.astro'
import PageCommunities from './PageCommunities.astro'
import PageCommunityCalls from './PageCommunityCalls.astro'
import PageContactUs from './PageContactUs.astro'
import PageDeutsch from './PageDeutsch.astro'
import PageForum from './PageForum.astro'
import PageFrench from './PageFrench.astro'
import PageGatherings from './PageGatherings.astro'
import PageGosh2016 from './PageGosh2016.astro'
import PageGosh2016Day1GrandChallenges from './PageGosh2016Day1GrandChallenges.astro'
import PageGosh2016Day2EnablingSolutions from './PageGosh2016Day2EnablingSolutions.astro'
import PageGosh2016Day3SharingWhatWeKnow from './PageGosh2016Day3SharingWhatWeKnow.astro'
import PageGosh2016Day4CrowdfundingScience from './PageGosh2016Day4CrowdfundingScience.astro'
import PageGosh20182 from './PageGosh20182.astro'
import PageGosh2018Faqs from './PageGosh2018Faqs.astro'
import PageGosh2018Participants from './PageGosh2018Participants.astro'
import PageGosh2019 from './PageGosh2019.astro'
import PageGosh2022ResearchAndPolicyWritingWorkshops from './PageGosh2022ResearchAndPolicyWritingWorkshops.astro'
import PageGoshAmbassadorProgram from './PageGoshAmbassadorProgram.astro'
import PageGoshCodeOfConduct from './PageGoshCodeOfConduct.astro'
import PageGoshCommunityAmbassadorHandbook from './PageGoshCommunityAmbassadorHandbook.astro'
import PageGoshCommunityCallOpenScienceHardwareForMarineApplicationsInterestForm from './PageGoshCommunityCallOpenScienceHardwareForMarineApplicationsInterestForm.astro'
import PageGoshCommunityEventsFramework from './PageGoshCommunityEventsFramework.astro'
import PageGoshManifesto from './PageGoshManifesto.astro'
import PageGoshWritingSprints20212022 from './PageGoshWritingSprints20212022.astro'
import PageGovernance from './PageGovernance.astro'
import PageGovernanceStructure from './PageGovernanceStructure.astro'
import PageGreatLakesGosh2019 from './PageGreatLakesGosh2019.astro'
import PageJapan from './PageJapan.astro'
import PageLogistics from './PageLogistics.astro'
import PageMedia from './PageMedia.astro'
import PageNewsletter from './PageNewsletter.astro'
import PageOhLitReview from './PageOhLitReview.astro'
import PageParticipants from './PageParticipants.astro'
import PagePolicyBriefs from './PagePolicyBriefs.astro'
import PagePortuguese from './PagePortuguese.astro'
import PagePublicPolicyWorkshop from './PagePublicPolicyWorkshop.astro'
import PagePublicPolicyWorkshop2020 from './PagePublicPolicyWorkshop2020.astro'
import PageRegionalEventsProgramme from './PageRegionalEventsProgramme.astro'
import PageSchedule from './PageSchedule.astro'
import PageSchedule2 from './PageSchedule2.astro'
import PageScienceEvents from './PageScienceEvents.astro'
import PageSignManifestoEntries from './PageSignManifestoEntries.astro'
import PageSpanish from './PageSpanish.astro'
import PageWelcomeCalls from './PageWelcomeCalls.astro'
import PageWhyGosh from './PageWhyGosh.astro'

export const composedViews: Partial<Record<number, typeof PageView>> = {
  10: PageHomeAi,
  21: PageGosh2017Ai,
  25: PageForum,
  36: PageGosh2016Day4CrowdfundingScience,
  40: PageSchedule2,
  43: PageGosh2016Day1GrandChallenges,
  52: PageGosh2016Day2EnablingSolutions,
  55: PageGosh2016Day3SharingWhatWeKnow,
  81: Page2016participants,
  98: PageWhyGosh,
  104: PageAboutAi,
  106: PageContactUs,
  288: PageGoshManifesto,
  494: PageSpanish,
  501: PageFrench,
  555: PagePortuguese,
  708: PageChinese,
  756: PageGoshCodeOfConduct,
  768: PageGosh2016,
  773: PageCernLogistics,
  833: PageSchedule,
  835: PageParticipants,
  841: PageBudget,
  857: PageLogistics,
  991: PageJapan,
  1049: PageMedia,
  1083: PageBangla,
  2236: PageGosh2017ReportAi,
  2239: PageGosh20182,
  2248: PageGatherings,
  2276: PageGlobalOpenScienceHardwareRoadmapAi,
  2767: PageGosh2018Faqs,
  2833: PageGosh2018Participants,
  2984: Page2018Program,
  3093: PageGosh2019,
  3214: PageGreatLakesGosh2019,
  3344: Page2019GlGoshProgram,
  3346: Page2019GlGoshHackathon,
  3410: Page2019GlGoshFaq,
  4147: PageGoshHistoryAi,
  4218: PagePublicPolicyWorkshop,
  4295: PageGoshWritingSprints20212022,
  4351: Page2021GoshCommunityCouncilElections,
  4696: Page2021ResearchFundingSalons,
  4740: PageCommunityCalls,
  4756: PageGoshCommunityEventsFramework,
  4791: PagePolicyBriefs,
  4820: PageGovernanceStructure,
  4897: PageNewsletter,
  5034: PageCommunities,
  5152: Page51522,
  5263: PageGosh2022ResearchAndPolicyWritingWorkshops,
  5320: PageDeutsch,
  5371: Page2022GoshCommunityCouncilElection,
  5478: PageWelcomeCalls,
  5530: PageGoshSocialMediaInformationFormAi,
  5704: PagePublicPolicyWorkshop2020,
  5752: Page57522,
  5789: PageOhLitReview,
  5897: PageProgramsAi,
  6028: PageRegionalEventsProgramme,
  6117: PageGovernance,
  6630: Page2023GoshCommunityCouncilElection,
  6712: PageGoshCommunityCallOpenScienceHardwareForMarineApplicationsInterestForm,
  7100: PageGoshAmbassadorProgram,
  7169: Page2024GoshCommunityCouncilElection,
  7200: PageGoshCommunityAmbassadorHandbook,
  7350: PageScienceEvents,
  7353: PageStemWorkshopsAi,
  7355: PageCollaborativeDevelopmentProgramme,
  7633: PageApply,
  7704: Page2025GoshCommunityCouncilElection,
  7777: PageGosh2026KathmanduNepalAi,
  7924: PageAmbassadorProgram,
  8112: PageSignManifestoEntries,
}

// The views that print the posts list page they are handed (`list`): the starter
// gives page 1 of the posts to a composed page only when its id is here.
export const listViews: ReadonlySet<number> = new Set([2276, 7633])
