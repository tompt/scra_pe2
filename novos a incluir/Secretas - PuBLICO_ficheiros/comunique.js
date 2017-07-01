var Comunique = {
	_pub_id:'ca-pub-3828975654388241',
	_slots:[],
	_slots_usados:[],
	_localizacao:'',
	_blocked_ads: false,
	_intrusiveFormats: false,
	isIE: function(){
		return (navigator.appName == 'Microsoft Internet Explorer');
	},
	hasSlot:function(slot){
		for (key in this._slots) {
			if (this._slots[key] === slot) {
				return true;
			}
		}
		return false;
	},
	usedSlot:function(slot){
		for (key in this._slots_usados) {
			if (this._slots_usados[key] === slot) {
				return true;
			}
		}
		return false;
	},
	tag:function(slot){
		this.isAssinante();

		if ((window.stopExecutions == true) && this._blocked_ads == false) {
			this.cleanSlots();
			this.blockSlots();
			this._blocked_ads = true;
		} else {
			if(window['hide' + slot] != undefined) return;
			if(!this.hasSlot(slot)) return;
			if(this.usedSlot(slot)) return;
			this._slots_usados[this._slots_usados.length] = slot;
			GA_googleFillSlot(slot);
		}
	},
	setSection:function(section){
		GA_googleAddAttr("Seccao", section);
	}, 
	isAssinante:function(){
		if ((window.isAssinante == true) && (this._intrusiveFormats == false)) {
			GA_googleAddAttr("assinante", "sim");
			this._intrusiveFormats = true;
		}
	},
	setAttr:function(name, value){
		GA_googleAddAttr(name, value);
	},
	setSlot:function(slot){
		this._slots[this._slots.length] = slot;
		GA_googleAddSlot(this._pub_id, slot);
	},
	cleanSlots:function(){
		for (var i = 0; i < this._slots_usados.length; i++) {
			if (document.getElementById("google_ads_div_" + this._slots_usados[i] + "_ad_wrapper") != null) {
				document.getElementById("google_ads_div_" + this._slots_usados[i] + "_ad_wrapper").innerHTML = "";
			}
		}
	},
	blockSlots:function(){
		this._slots_usados = this._slots;
		this._slots = "";
	},
	detectReferrer:function(){
		if (document.referrer.indexOf("google") != -1) {
			GA_googleAddAttr("referrer", "google");
		}
		if (document.referrer.indexOf("facebook") != -1) {
			GA_googleAddAttr("referrer", "facebook");
		}
		if (document.referrer.indexOf("publico.pt") != -1) {
			GA_googleAddAttr("referrer", "publico");
		}
	},
	setLocation:function(loc){
		this._localizacao = loc;

		if (this.isIE() && false){
			GA_googleUseIframeRendering();	
		} else {
				this.setSlot("PublicoHomepage300x250");
				this.setSlot("RadioNova300x250");
				this.setSlot("PublicoHomepage300x250Slot02");
				this.setSlot("PublicoMundoNoticias150x600");
				this.setSlot("PublicoEconomiaNoticias150x600");
				this.setSlot("PublicoPortugalNoticias150x600");
				this.setSlot("PublicoHomepage1x1");
				//TAGS Video Incontent
				this.setSlot("VideoInContent_PublicoPortugal");
				this.setSlot("VideoInContent_PublicoEconomia");
				this.setSlot("VideoInContent_PublicoMundo");
				this.setSlot("VideoInContent_PublicoCultura");
				this.setSlot("VideoInContent_PublicoDesporto");
				this.setSlot("VideoInContent_PublicoCiencia");
				this.setSlot("VideoInContent_PublicoTecnologia");
				this.setSlot("VideoInContent_Publico");
				//TAGS Segmentadas Billboard 
				this.setSlot("PublicoPortugalNoticias990x30");
				this.setSlot("PublicoEconomiaNoticias990x30");
				this.setSlot("PublicoMundoNoticias990x30");
				this.setSlot("PublicoCulturaNoticias990x30");
				this.setSlot("PublicoDesportoNoticias990x30");
				this.setSlot("PublicoCienciaNoticias990x30");
				this.setSlot("PublicoTecnologiaNoticias990x30");
				this.setSlot("PublicoEducacao990x30");
				this.setSlot("PublicoEducacaoNoticias990x30");
				//End TAGS Billboard
				this.setSlot("PublicoHomepage300x60Btn01");
				this.setSlot("PublicoHomepage300x60Btn02");
				this.setSlot("PublicoHomepage300x60Btn03");
				this.setSlot("PublicoHomepage300x60Btn04");
				this.setSlot("PublicoHomepage300x60Btn05");
				this.setSlot("PublicoHomepage300x60Btn06");
				this.setSlot("PublicoHomepage300x60Btn07");
				this.setSlot("PubliReportagemOPEL_ASTRA");
				this.setSlot("PublicoHomepage220x80Banner1");
				this.setSlot("PublicoHomepage620x50WideBanner1");
				this.setSlot("PublicoHomepage620x50WideBanner2");
				this.setSlot("PublicoHomepage620x50WideBanner3");
				this.setSlot("PublicoHomepage728x90");
				//this.setSlot("PublicoHomepage990x30");
				this.setSlot("PublicoDefault990x30");
				//this.setSlot("PublicoHPRoadblock1x1");
				this.setSlot("PublicoHomepage10x10Textlink");
				this.setSlot("PublicoPortugal300x250");
				this.setSlot("PublicoPortugal1x1");
				this.setSlot("PublicoPortugal990x30");
				this.setSlot("PublicoPortugal150x600");
				//this.setSlot("PublicoPolitica300x250");
				//this.setSlot("PublicoSociedade300x250");
				//this.setSlot("PublicoEducacao300x250");
				this.setSlot("PublicoEducacao1x1");
				//this.setSlot("PublicoSaude300x250");
				//this.setSlot("PublicoLocal300x250");
				//this.setSlot("PublicoJustica300x250");
				//this.setSlot("PublicoMedia300x250");
				this.setSlot("PublicoPortugal300x60Btn01");
				this.setSlot("PublicoPortugal300x60Btn02");
				this.setSlot("PublicoEconomia300x250");
				this.setSlot("PublicoEconomiaNoticias300x250");
				this.setSlot("PublicoEconomiaNoticias1x1");
				this.setSlot("PublicoEconomia150x600");
				this.setSlot("PublicoEconomia1x1");
				this.setSlot("PublicoEconomia990x30");
				this.setSlot("PublicoEconomiaBolsa300x250");
				this.setSlot("PublicoMercados300x250");
				this.setSlot("PublicoEmpresas300x250");
				this.setSlot("PublicoTrabalhoEEmprego300x250");
				this.setSlot("PublicoFinancasPublicas300x250");
				this.setSlot("PublicoInternacional300x250");
				this.setSlot("PublicoEmpreendedorismo300x250");
				this.setSlot("PublicoEconomia300x60Btn01");
				this.setSlot("PublicoMundo300x250");
				this.setSlot("PublicoMundoNoticias300x250");
				this.setSlot("PublicoMundoNoticias1x1");
				this.setSlot("PublicoMundo1x1");
				this.setSlot("PublicoMundo150x600");
				this.setSlot("PublicoMundo990x30");
				this.setSlot("PublicoEuropa300x250");
				this.setSlot("PublicoAmerica300x250");
				this.setSlot("PublicoAfrica300x250");
				this.setSlot("PublicoAsia300x250");
				this.setSlot("PublicoMedioOriente300x250");
				this.setSlot("PublicoMundo300x60Btn01");
				this.setSlot("PublicoDesporto300x250");
				this.setSlot("PublicoDesportoNoticias300x250");
				this.setSlot("PublicoDesportoNoticias1x1");
				this.setSlot("PublicoDesporto1x1");
				this.setSlot("PublicoDesporto150x600");
				this.setSlot("PublicoDesporto990x30");
				this.setSlot("PublicoDesportoCalendario300x250");
				this.setSlot("PublicoDesportoAgenda300x250");
				this.setSlot("PublicoFCPorto300x250");
				this.setSlot("PublicoSLBenfica300x250");
				this.setSlot("PublicoSPBraga300x250");
				this.setSlot("PublicoSporting300x250");
				this.setSlot("PublicoFutebolNacional300x250");
				this.setSlot("PublicoFutebolInternacional300x250");
				this.setSlot("PublicoTenis300x250");
				this.setSlot("PublicoMotores300x250");
				this.setSlot("PublicoOutrasModalidades300x250");
				this.setSlot("PublicoDesporto300x60Btn01");
				this.setSlot("PublicoCultura300x250");
				this.setSlot("PublicoCulturaNoticias300x250");
				this.setSlot("PublicoCulturaNoticias1x1");
				this.setSlot("PublicoCultura1x1");
				this.setSlot("PublicoCultura150x600");
				this.setSlot("PublicoCultura990x30");
				this.setSlot("PublicoMusica300x250");
				//this.setSlot("PublicoCinema300x250");
				this.setSlot("PublicoTeatro300x250");
				this.setSlot("PublicoDanca300x250");
				this.setSlot("PublicoLivros300x250");
				this.setSlot("PublicoArtes300x250");
				//this.setSlot("PublicoArquitectura300x250");
				this.setSlot("PublicoPatrimonio300x250");
				this.setSlot("PublicoCultura300x60Btn01");
				this.setSlot("PublicoTecnologia300x250");
				this.setSlot("PublicoTecnologiaNoticias300x250");
				this.setSlot("PublicoTecnologiaNoticias1x1");
				this.setSlot("PublicoTecnologia1x1");
				this.setSlot("PublicoTecnologia150x600");
				this.setSlot("PublicoTecnologia990x30");
				this.setSlot("PublicoInovacao300x250");
				this.setSlot("PublicoNegocios300x250");
				this.setSlot("PublicoVideojogos300x250");
				this.setSlot("PublicoTelecomunicacoes300x250");
				this.setSlot("PublicoAplicacoes300x250");
				this.setSlot("PublicoTecnologia300x60Btn01");
				this.setSlot("PublicoCiencia300x250");
				this.setSlot("PublicoCienciaNoticias300x250");
				this.setSlot("PublicoCienciaNoticias1x1");
				this.setSlot("PublicoCiencia1x1");
				this.setSlot("PublicoCiencia990x30");
				this.setSlot("PublicoCiencia150x600");
				this.setSlot("PublicoEspaco300x250");
				this.setSlot("PublicoMedicina300x250");
				//this.setSlot("PublicoEcosfera300x250");
				//this.setSlot("PublicoEcosferaNoticias300x250");
				this.setSlot("PublicoEcosferaNoticias1x1");
				this.setSlot("PublicoEcosfera1x1");
				this.setSlot("PublicoCiencia300x60Btn01");
				this.setSlot("PublicoOpiniao300x250");
				this.setSlot("PublicoOpiniaoNoticias300x250");
				this.setSlot("PublicoOpiniaoNoticias1x1");
				this.setSlot("PublicoOpiniao1x1");
				this.setSlot("PublicoOpiniao990x30");
				this.setSlot("PublicoOpiniao150x600");
				this.setSlot("PublicoOpiniao300x60Btn01");
				this.setSlot("PublicoMultimedia300x250");
				this.setSlot("PublicoMultimedia1x1");
				this.setSlot("PublicoMultimedia990x30");
				this.setSlot("PublicoMultimedia150x600");
				//this.setSlot("PublicoMultimediaInfografias300x250");
				//this.setSlot("PublicoMultimediaFotogalerias300x250");
				//this.setSlot("PublicoMultimediaVideos300x250");
				this.setSlot("PublicoMultimedia300x60Btn01");
				this.setSlot("PublicoPublicidadeElCorteInglesApeteceReceitas300x250");
				this.setSlot("PublicoUltimaHora300x250");
				this.setSlot("PublicoHoje728x90");
				this.setSlot("PublicoDefaultTags300x250");
				this.setSlot("PublicoDefaultTags1x1");
				this.setSlot("PublicoDefaultNoticias300x250");
				this.setSlot("PublicoDefaultNoticias1x1");
				this.setSlot("PublicoDefaultUtilizadores300x250");
				this.setSlot("PublicoPesquisa300x250");
				this.setSlot("PublicoPesquisaTopicos300x250");
				this.setSlot("PublicoAutores300x250");
				this.setSlot("PublicoAutor300x250");
				this.setSlot("PublicoPoliticaPrivacidade300x250");
				this.setSlot("PublicoFichaTecnica300x250");
				this.setSlot("PublicoAjuda300x250");
				this.setSlot("PublicoCriteriosPublicacaoComentarios300x250");
				this.setSlot("PublicoTermosCondicoes300x250");
				this.setSlot("PublicoContactos300x250");
				this.setSlot("PublicoJornal300x250");
				this.setSlot("PublicoMeteorologia300x250");
				this.setSlot("PublicoHomepage60x46");
				this.setSlot("PublicoUltimaHora60x46");
				this.setSlot("PublicoEspeciais300x250");
				//this.setSlot("PublicoNewsletter300x250");
				this.setSlot("PublicoClassificados300x250");
				this.setSlot("PublicoAoVivo300x250");//r
				this.setSlot("PublicoEmDirecto300x250");
				this.setSlot("PublicoQuestionarios300x250");
				this.setSlot("PublicoInqueritos300x250");
				this.setSlot("PublicoPortugalNoticias300x250");
				this.setSlot("PublicoPoliticaNoticias300x250");
				this.setSlot("PublicoPoliticaNoticias1x1");
				//this.setSlot("PublicoSociedadeNoticias300x250");
				//this.setSlot("PublicoEducacaoNoticias300x250");
				this.setSlot("PublicoEducacaoNoticias1x1");
				this.setSlot("PublicoExclusivoMREC300x250");
				//this.setSlot("PublicoSaudeNoticias300x250");
				//this.setSlot("PublicoLocalNoticias300x250");
				//this.setSlot("PublicoJusticaNoticias300x250");
				this.setSlot("PublicoMediaNoticias300x250");
				this.setSlot("PublicoPortugalNoticias1x1");
				this.setSlot("PublicoEmprego300x250");
				this.setSlot("PublicoModeracao300x250");
				this.setSlot("PublicoComentariosEInqueritos300x250");
				this.setSlot("PublicoTopicos300x250");
				this.setSlot("PublicoProjecto13Pensadores300x250");
				this.setSlot("PublicoUtilizador300x250");
				this.setSlot("PublicoDefault300x250Slot02");
				this.setSlot("PublicoModalBoxFixeAds300x380");
				this.setSlot("PublicoDesportoVoltaAFranca300x250");
				this.setSlot("PublicoNoticiasBotao300x60");
				this.setSlot("PublicoEconomiaNoticias300x60");
				this.setSlot("PublicoPortuguesesComCertezaDestaque380x30");
				this.setSlot("PublicoPortuguesesComCertezaLogo60x60");
				this.setSlot("PublicoPortuguesesComCertezaLeaderboar728x90");
				this.setSlot("PublicoPaywallTeste300x250");
				this.setSlot("PublicoPaywallLimite1x1");
				this.setSlot("PublicoPaywallOrganicosLimite1x1");
				this.setSlot("PublicoTestes300x250");
				this.setSlot("PublicoMobile314x364");
				this.setSlot("PublicoMobile300x40");
				this.setSlot("PublicoMobile300x60");
				this.setSlot("PublicoDefaultTagsJFKennedy300x250");
				this.setSlot("PublicoMenuNavegacaoBanner140x30");
				this.setSlot("PublicoLandingPageCGD300x250");
				this.setSlot("PublicoBlogues300x250");
				this.setSlot("PublicoTesteAB1x1");
				this.setSlot("PublicoMobileNoticiasBanner");
				this.setSlot("PublicoMobileROSBanner");
				this.setSlot("PublicoMobileNoticiasIntro");
				//this.setSlot("PublicoMobileROSIntro");
				this.setSlot("PublicoRevista2HP300x250");
				this.setSlot("PublicoRevista2Artigo300x250");
				this.setSlot("PublicoBloguesBrasilNaEstrada300x250");
				this.setSlot("PublicoAnoGrandeDoBrasil300x250");
				this.setSlot("PublicoNoticiasRoadblock1x1");
				this.setSlot("PublicoDesportoMundial2014Canon2x2");
				this.setSlot("PublicoPaywall1Artigo2x2");
				this.setSlot("PublicoDesportoMundial2014300x250");
				this.setSlot("PublicoDesportoMundial2014314x364");
				this.setSlot("PublicoDesportoMundial20141x1");
				this.setSlot("PublicoIpsilon300x60");
				//this.setSlot("PublicoIpsilon300x60_02");
				//this.setSlot("PublicoIpsilon300x250");
				this.setSlot("PublicoDefaultNoticias990x30");
				this.setSlot("PublicoIpsilon1x1");
				this.setSlot("PublicoDiasDeCalor300x250");
				this.setSlot("PublicoEspecialArtigosDeInvestigacao1x1");
				this.setSlot("PublicoNoticiasBotao300x60Slot02");
				this.setSlot("PublicoGolfe300x250Slot02");
				this.setSlot("PublicoLegislativas1x1");
				this.setSlot("PublicoVideosTviLinear640x360v");
				this.setSlot("PublicoAmericaPelosLivros300x250");
				this.setSlot("PublicoInstantArticles300x250");
				//TAGS P3
				this.setSlot("PublicoP3PE3Ts_300x250");
				this.setSlot("PublicoP3HP300x250");
				this.setSlot("PublicoP31x1");
				this.setSlot("PublicoP3300x250");
				this.setSlot("PublicoP31x1ROS");
				this.setSlot("PublicoP3300x60Btn01");
				this.setSlot("PublicoP3300x60BtnROS");
				this.setSlot("PublicoP3Fotogalerias300x250");
				this.setSlot("PublicoP3OptimusPrimaveraSound300x250");
				this.setSlot("PublicoP3Mexefest300x250");
				this.setSlot("PublicoP3ParedesDeCoura300x250");
				this.setSlot("PublicoP3Widget");
				this.setSlot("PublicoP3Mobile314x364");
				this.setSlot("teste_Passback");
				this.setSlot("VideoInContent_P3");
				this.setSlot("PublicoP3990x30");
				this.setSlot("PublicoP3Artigos300x250");
				this.setSlot("P3PET_MREC300x250_Mobile");
				//TAG 990x30 IPSILON
				this.setSlot("PublicoIpsilon990x30");
				//TAGS CONTEUDOS PATROCINADOS
				this.setSlot("PatrocinadosBosch300x250");
				this.setSlot("PatrocinadosBosch300x250_slot2");
				this.setSlot("PatrocinadosJogosSantaCasa300x250");
				this.setSlot("PatrocinadosJogosSantaCasa300x250_slot2");
				this.setSlot("PatrocinadosComissaoEuropeia300x250");
				this.setSlot("PatrocinadosComissaoEuropeia300x250_slot2");
				this.setSlot("PatrocinadosComissaoEuropeiaClarificaRegras300x250");
				this.setSlot("PatrocinadosComissaoEuropeiaClarificaRegras300x250_slot2");
				this.setSlot("PatrocinadosMazda300x250");
				this.setSlot("PatrocinadosMazda300x250_slot2");
				this.setSlot("PatrocinadosNosPrimaveraTexto1_300x250");
				this.setSlot("PatrocinadosNosPrimaveraTexto1_300x250_slot2");
				this.setSlot("PatrocinadosNosPrimaveraTexto2_300x250");
				this.setSlot("PatrocinadosNosPrimaveraTexto2_300x250_slot2");
				this.setSlot("PatrocinadosNosPrimaveraTexto3_300x250");
				this.setSlot("PatrocinadosNosPrimaveraTexto3_300x250_slot2");
				this.setSlot("PatrocinadosNosPrimaveraTexto4_300x250");
				this.setSlot("PatrocinadosNosPrimaveraTexto4_300x250_slot2");
				this.setSlot("PatrocinadosHerdade_Do_Peso_300x250");
				this.setSlot("PatrocinadosHerdade_Do_Peso_300x250_slot2");
				this.setSlot("PatrocinadosMaille_300x250");
				this.setSlot("PatrocinadosMaille_300x250_slot2");
				this.setSlot("PatrocinadosHidradenite_300x250");
				this.setSlot("PatrocinadosHidradenite_300x250_slot2");
				this.setSlot("PatrocinadosIkea_300x250");
				this.setSlot("PatrocinadosIkea_300x250_slot2");
				this.setSlot("Patrocinados_Univercidade_Awareness_300x250");
				this.setSlot("Patrocinados_Univercidade_Awareness_300x250_slot2");
				this.setSlot("Patrocinados_Catolica_300x250");
				this.setSlot("Patrocinados_Catolica_300x250_slot2");
				this.setSlot("Patrocinados_Continente_300x250");
				this.setSlot("Patrocinados_Continente_300x250_slot2");
				this.setSlot("Patrocinados_Ctt_300x250");
				this.setSlot("Patrocinados_Ctt_300x250_slot2");
				this.setSlot("Patrocinados_hp_300x250");
				this.setSlot("Patrocinados_hp_300x250_slot2");
				this.setSlot("Patrocinados_bang_olufsen_300x250");
				this.setSlot("Patrocinados_bang_olufsen_300x250_slot2");
				this.setSlot("Patrocinados_endesa_300x250");
				this.setSlot("Patrocinados_endesa_300x250_slot2");
				this.setSlot("Patrocinados_pfizer_300x250");
				this.setSlot("Patrocinados_pfizer_300x250_slot2");
				this.setSlot("Patrocinados_continente_auto_300x250");
				this.setSlot("Patrocinados_continente_auto_slot02");
				this.setSlot("atrocinadosAPA_300x250");
				this.setSlot("PatrocinadosAPA_300x250_slot2");
				this.setSlot("PatrocinadosTMM_300x250");
				this.setSlot("PatrocinadosTMM_300x250_slot2");
				//TAGS EURO 2016
				this.setSlot("Euro2016_HP_300x250");
				this.setSlot("Euro2016_Noticias_300x250");
				this.setSlot("Euro2016_IP_990x50");
				//TAGS Widgets
				this.setSlot("Euro2016_DesafioMEO_300x250");
				this.setSlot("PublicoMundo300x60Btn02");
				this.setSlot("PublicoEconomia300x60Btn02");
				this.setSlot("PublicoCultura300x60Btn02");
				this.setSlot("PublicoCiencia300x60Btn02");
				this.setSlot("PublicoDesporto300x60Btn02");
				this.setSlot("PublicoTecnologia300x60Btn02");
				this.setSlot("PublicoOpiniao300x60Btn02");
				this.setSlot("PublicoMultimedia300x60Btn02");
				this.setSlot("PublicoP3Widget300x60");
				this.setSlot("PublicoIpsilonTVWidget300x250");
				this.setSlot("PublicoFoxWidgetArtigos300x250");
				//tAGS JogosOlimpicos
				this.setSlot("PublicoJogosOlimpicos300x250");
				this.setSlot("PublicoJogosOlimpicos990x30");
                this.setSlot("MRECParalimpicos");
				this.setSlot("BillboardParalimpicos");
				this.setSlot("BillboardParalimpicosV2");
				this.setSlot("BillboardParalimpicosV3");


			if (this._localizacao != ''){
				this.detectReferrer();
				GA_googleFetchAds();
			}
		}
	}
}