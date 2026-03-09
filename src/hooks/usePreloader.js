// Sve slike koje treba pre-loadovati pre prikaza sajta
import anastasijaVojinovic from '../assets/OrganizacioniTim/SlikeTimova/Anastasija_Vojinovic.JPG'
import coreTeam from '../assets/OrganizacioniTim/SlikeTimova/core_team.JPG'
import savaStevic from '../assets/OrganizacioniTim/SlikeTimova/Sava_Stević.JPG'
import dizajnTeam from '../assets/OrganizacioniTim/SlikeTimova/dizajn.JPG'
import mihailoMatovic from '../assets/OrganizacioniTim/SlikeTimova/Mihailo_Matović.JPG'
import itTeam from '../assets/OrganizacioniTim/SlikeTimova/it.JPG'
import anastasijaRus from '../assets/OrganizacioniTim/SlikeTimova/Anastasija_Rus.JPG'
import logistikaTeam from '../assets/OrganizacioniTim/SlikeTimova/Logistika.jpg'
import zeljanaKosanin from '../assets/OrganizacioniTim/SlikeTimova/Željana_Košanin.JPG'
import crTeam from '../assets/OrganizacioniTim/SlikeTimova/cr.JPG'
import djordjeGrubic from '../assets/OrganizacioniTim/SlikeTimova/Djordje_Grubic.jpg'
import prTeam from '../assets/OrganizacioniTim/SlikeTimova/PR.JPG'
import anjaKrstic from '../assets/OrganizacioniTim/SlikeTimova/Anja_Krstic.jpg'
import hrTeam from '../assets/OrganizacioniTim/SlikeTimova/hr.jpg'

import heroBackground from '../assets/hero/background-main.svg'
import fonisLogo from '../assets/hero/fonisLogo.png'
import hourglass from '../assets/hero/hourglass.png'

import iskustvaKamile from '../assets/Iskustva/IskustvaKamile.png'
import iskustvaOblak from '../assets/Iskustva/IskustvaOblak.png'

import erstePartner from '../assets/Partneri/erste 1.png'
import godisnjiPartner from '../assets/Partneri/godisnji.png'
import medijskiPartner from '../assets/Partneri/medijski.png'
import robniPartner from '../assets/Partneri/robni.png'
import samsung4 from '../assets/Partneri/samsung 4.png'

import { useEffect, useState } from 'react'

const IMAGE_URLS = [
  anastasijaVojinovic,
  coreTeam,
  savaStevic,
  dizajnTeam,
  mihailoMatovic,
  itTeam,
  anastasijaRus,
  logistikaTeam,
  zeljanaKosanin,
  crTeam,
  djordjeGrubic,
  prTeam,
  anjaKrstic,
  hrTeam,
  heroBackground,
  fonisLogo,
  hourglass,
  iskustvaKamile,
  iskustvaOblak,
  erstePartner,
  godisnjiPartner,
  medijskiPartner,
  robniPartner,
  samsung4,
]

function loadImage(src) {
  return new Promise((resolve) => {
    const img = new Image()
    img.onload = resolve
    img.onerror = resolve // ne blokiraj ako jedna slika ne uspe
    img.src = src
  })
}

export function usePreloader() {
  const [loaded, setLoaded] = useState(false)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let completed = 0
    const total = IMAGE_URLS.length

    const promises = IMAGE_URLS.map((src) =>
      loadImage(src).then(() => {
        completed++
        setProgress(Math.round((completed / total) * 100))
      })
    )

    Promise.all(promises).then(() => {
      // Kratka pauza da se 100% vidi pre nestajanja
      setTimeout(() => setLoaded(true), 400)
    })
  }, [])

  return { loaded, progress }
}

