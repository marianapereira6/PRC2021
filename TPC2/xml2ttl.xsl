<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
    xmlns:xs="http://www.w3.org/2001/XMLSchema"
    exclude-result-prefixes="xs"
    version="2.0">
    
    <xsl:output method="text" encoding="UTF-8" indent="yes"/>
    
    <xsl:template match="obra">
        ###  http://www.di.uminho.pt/prc2021/arq-musical#<xsl:value-of select="@id"/>
        :<xsl:value-of select="@id"/> rdf:type owl:NamedIndividual ,
        :Obra ;
        :foiComposta: "<xsl:value-of select="compositor"/>"^^xsd:string ;
        :tipo "<xsl:value-of select="tipo"/>"^^xsd:string ;
        :titulo "<xsl:value-of select="titulo"/>"^^xsd:string .
        <xsl:apply-templates select="compositor"/>
        <xsl:apply-templates select="instrumentos"/>
       
    </xsl:template>
    
    
    <xsl:template match="compositor">
        ###  http://www.di.uminho.pt/prc2021/arq-musical#<xsl:value-of select="translate(../compositor, ',. ','_')"/>
        :<xsl:value-of select="translate(../compositor, ',. ','_')"/> rdf:type owl:NamedIndividual ,
        :Compositor ;
        :compos :<xsl:value-of select="../@id"/> ;
        :nome "<xsl:value-of select="../compositor"/>"^^xsd:string.
        
   
    </xsl:template>
    
    
    <xsl:template match="instrumento">
        ###  http://www.di.uminho.pt/prc2021/arq-musical#<xsl:value-of select="translate(designacao, ' ','_')"/>_<xsl:value-of select="../../@id"/>
        :<xsl:value-of select="translate(designacao, ' ','_')"/>_<xsl:value-of select="../../@id"/> rdf:type owl:NamedIndividual ,
        :Instrumento ;
        :éUtilizado :<xsl:value-of select="../../@id"/> ;
        :designação "<xsl:value-of select="designacao"/>"^^xsd:string.
        <xsl:apply-templates select="partitura"/>
       
    </xsl:template>
   
    
    <xsl:template match="partitura">
        ###  http://www.di.uminho.pt/prc2021/arq-musical#partitura_<xsl:value-of select="@path"/>
        :partitura_<xsl:value-of select="@path"/> rdf:type owl:NamedIndividual ,
        :Partitura ;
        :éPara :<xsl:value-of select="translate(../designacao, ' ','_')"/>_<xsl:value-of select="../../../@id"/> ;
      <xsl:choose>
       <xsl:when test="@voz">
        :voz "<xsl:value-of select="@voz"/>"^^xsd:string ;
       </xsl:when>
      </xsl:choose>
        :type "<xsl:value-of select="@type"/>"^^xsd:string ;
        :path "<xsl:value-of select="@path"/>"^^xsd:string.
      
    </xsl:template>
    
</xsl:stylesheet>